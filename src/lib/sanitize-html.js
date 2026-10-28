import sanitizeHtml from "sanitize-html";

const ALLOWED_TAGS = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "br",
  "strong",
  "em",
  "b",
  "i",
  "u",
  "ul",
  "ol",
  "li",
  "a",
  "img",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "blockquote",
  "figure",
  "figcaption",
  "span",
  "div",
];

const TEXT_ATTRIBUTES = ["class", "title"];

export function sanitizeCmsHtml(html) {
  if (!html || typeof html !== "string") return "";

  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      a: ["href", "title", "class", "target", "rel"],
      img: ["src", "alt", "title", "class", "width", "height"],
      th: ["colspan", "rowspan", ...TEXT_ATTRIBUTES],
      td: ["colspan", "rowspan", ...TEXT_ATTRIBUTES],
      "*": TEXT_ATTRIBUTES,
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: {
      img: ["http", "https"],
    },
    allowProtocolRelative: false,
    transformTags: {
      a: (tagName, attribs) => {
        const next = { ...attribs };
        if (next.target === "_blank") {
          next.rel = "noopener noreferrer";
        } else {
          delete next.target;
        }
        return { tagName, attribs: next };
      },
    },
  });
}
