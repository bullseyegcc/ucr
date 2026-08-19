import { products as catalog } from "../../assets/products";

function toHttps(url) {
  if (!url || typeof url !== "string") return "";
  return url.replace(/^http:\/\//i, "https://");
}

function decodeEntities(text) {
  return text
    .replace(/&nbsp;/gi, " ")
    .replace(/&ndash;|&#8211;|&#x2013;/gi, "-")
    .replace(/&mdash;|&#8212;|&#x2014;/gi, "-")
    .replace(/\u2013|\u2014|\u2212/g, "-")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16)),
    );
}

function stripHtml(html) {
  if (!html || typeof html !== "string") return "";
  return decodeEntities(html.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function htmlToLines(html) {
  if (!html || typeof html !== "string") return [];
  return html
    .split(/<\/p>|<\/li>|<br\s*\/?>|\r?\n/i)
    .map((chunk) => stripHtml(chunk).replace(/^[-•]\s*/, "").trim())
    .filter(Boolean);
}

function toParamRow(cells) {
  return {
    parameter: cells[0] || "",
    unit: cells[1] || "",
    astm: cells[2] || "",
    ucr: cells[3] || "",
  };
}

function isHeaderRow(row) {
  const label = `${row.parameter} ${row.unit} ${row.astm} ${row.ucr}`.toLowerCase();
  return /parameter/.test(label) && /unit/.test(label);
}

function splitDelimitedLine(line) {
  if (line.includes("|")) return line.split("|").map((part) => part.trim());
  if (line.includes("\t")) return line.split("\t").map((part) => part.trim());
  const spaced = line.split(/\s{2,}/).map((part) => part.trim()).filter(Boolean);
  return spaced.length >= 4 ? spaced : [line];
}

function parseHtmlTable(html) {
  const rows = [];
  const rowMatches = html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi);
  for (const rowMatch of rowMatches) {
    const cells = [...rowMatch[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map(
      (cell) => stripHtml(cell[1])
    );
    if (cells.some(Boolean)) rows.push(toParamRow(cells));
  }
  return rows;
}

export function hasStructuredParameters(rows) {
  return Boolean(rows?.some((row) => row.unit || row.astm || row.ucr));
}

function parseTechnicalParameters(html) {
  if (!html || typeof html !== "string") return [];

  const fromTable = /<table/i.test(html) ? parseHtmlTable(html) : [];
  const source = fromTable.length
    ? fromTable
    : htmlToLines(html).map((line) => toParamRow(splitDelimitedLine(line)));

  return source.filter((row) => row.parameter && !isHeaderRow(row));
}

function formatPackagingLabel(raw) {
  const lower = raw.toLowerCase().replace(/\s+/g, " ").trim();
  if (
    lower === "weightranges" ||
    lower === "weight ranges" ||
    lower === "weight range" ||
    lower === "weight"
  ) {
    return "Weight";
  }
  if (lower === "packaging" || lower === "package") return "Packaging";
  return raw.replace(/\b\w/g, (char) => char.toUpperCase());
}

function parsePackagingLine(line) {
  const cleaned = line.replace(/\u2013|\u2014|\u2212/g, "-");

  if (cleaned.includes("|")) {
    const [label, ...rest] = cleaned.split("|");
    return {
      label: formatPackagingLabel(label.trim()),
      value: rest.join("|").trim(),
    };
  }

  const colon = cleaned.match(/^([^:]+):\s*(.+)$/);
  if (colon) {
    return {
      label: formatPackagingLabel(colon[1]),
      value: colon[2].trim(),
    };
  }

  const lower = cleaned.toLowerCase();
  const known = [
    ["weight ranges", "Weight"],
    ["weight range", "Weight"],
    ["weight", "Weight"],
    ["packaging", "Packaging"],
  ].find(
    ([prefix]) => lower === prefix || lower.startsWith(`${prefix} `),
  );

  if (known) {
    const [prefix, label] = known;
    return { label, value: cleaned.slice(prefix.length).trim() };
  }

  const numbered = cleaned.match(/^(.+?)\s+(\d.*)$/);
  if (numbered) {
    return {
      label: formatPackagingLabel(numbered[1]),
      value: numbered[2].trim(),
    };
  }

  return { label: formatPackagingLabel(cleaned), value: "" };
}

function parsePackagingDimensions(html) {
  if (!html || typeof html !== "string") return [];
  return htmlToLines(html).map(parsePackagingLine).filter((row) => row.label);
}

function normalizePackagingDimensions(value) {
  if (Array.isArray(value)) {
    return value.filter((row) => row?.label);
  }
  if (value && typeof value === "object") {
    return Object.entries(value)
      .filter(([, item]) => item)
      .map(([key, item]) => ({
        label: formatPackagingLabel(key),
        value: String(item).replace(/\u2013|\u2014|\u2212/g, "-"),
      }));
  }
  return [];
}

function mediaUrl(media) {
  return toHttps(media?.node?.sourceUrl || media?.sourceUrl || "");
}

function rewriteHtmlUrls(html) {
  if (!html || typeof html !== "string") return "";
  return html
    .replace(/(src|href|srcset)="http:\/\//gi, '$1="https://')
    .replace(/&ndash;|&#8211;|&#x2013;/gi, "-")
    .replace(/&mdash;|&#8212;|&#x2014;/gi, "-");
}

export function formatDate(iso) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function mapPost(node) {
  if (!node) return null;

  const details = node.postDetails || {};
  const excerpt =
    stripHtml(node.excerpt) || excerptFromContent(node.content);

  return {
    id: node.databaseId,
    slug: node.slug,
    title: node.title,
    excerpt,
    image: mediaUrl(node.featuredImage),
    date: formatDate(node.date),
    category: node.categories?.nodes?.[0]?.name || "",
    author: details.authorName || node.author?.node?.name || "",
    authorImage: mediaUrl(details.authorImage),
    contentHtml: rewriteHtmlUrls(node.content || ""),
  };
}

function excerptFromContent(html, max = 180) {
  const text = stripHtml(html);
  if (!text) return "";
  if (text.length <= max) return text;
  const trimmed = text.slice(0, max);
  const lastSpace = trimmed.lastIndexOf(" ");
  return `${trimmed.slice(0, lastSpace > 80 ? lastSpace : max)}…`;
}

export function mapProduct(node) {
  if (!node) return null;

  const details = node.productDetails || {};
  const icon = mediaUrl(details.icon) || mediaUrl(node.featuredImage);
  const technicalParametersHtml = rewriteHtmlUrls(details.technicalParameters || "");
  const mapped = {
    id: node.databaseId,
    slug: node.slug,
    name: node.title,
    description: stripHtml(details.shortDescription),
    sku: details.sku || "",
    icon,
    featured: Boolean(details.featured),
    longDescription: stripHtml(details.longDescription),
    longDescriptionHtml: rewriteHtmlUrls(details.longDescription || ""),
    specifications: htmlToLines(details.specifications),
    applications: htmlToLines(details.applications),
    technicalParameters: parseTechnicalParameters(details.technicalParameters),
    technicalParametersHtml,
    packagingDimensions: parsePackagingDimensions(details.packagingDimensions),
    sizes: htmlToLines(details.sizes),
    productSpecification: details.productSpecification || "",
  };

  return applyCatalogFallback(mapped);
}

function applyCatalogFallback(mapped) {
  const fallback = catalog.find((product) => product.slug === mapped.slug);
  if (!fallback) return mapped;

  return {
    ...fallback,
    ...mapped,
    description: mapped.description || fallback.description,
    sku: mapped.sku || fallback.sku,
    icon: mapped.icon || fallback.icon,
    longDescription: mapped.longDescription || fallback.longDescription,
    specifications: mapped.specifications.length
      ? mapped.specifications
      : fallback.specifications,
    applications: mapped.applications.length
      ? mapped.applications
      : fallback.applications,
    technicalParameters: hasStructuredParameters(mapped.technicalParameters)
      ? mapped.technicalParameters
      : fallback.technicalParameters,
    packagingDimensions: mapped.packagingDimensions.length
      ? mapped.packagingDimensions
      : normalizePackagingDimensions(fallback.packagingDimensions),
    sizes: mapped.sizes.length ? mapped.sizes : fallback.sizes,
    productSpecification:
      mapped.productSpecification || fallback.productSpecification,
  };
}
