function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildHtmlTable(rows) {
  const body = rows
    .map(
      (row) =>
        `<tr><td style="padding:8px 12px 8px 0;font-weight:600;vertical-align:top;color:#111;">${escapeHtml(row.label)}</td><td style="padding:8px 0;color:#333;white-space:pre-wrap;">${escapeHtml(row.value)}</td></tr>`
    )
    .join("");

  return `<table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:15px;line-height:1.5;">${body}</table>`;
}

function buildTextBody(title, rows) {
  const lines = rows.map((row) => `${row.label}: ${row.value}`);
  return [title, "", ...lines].join("\n");
}

export function buildContactEmail(data) {
  const rows = [
    { label: "Form", value: "Contact page" },
    { label: "First name", value: data.firstName },
    { label: "Email", value: data.email },
    { label: "Phone", value: data.phone || "Not provided" },
    { label: "Message", value: data.message || "Not provided" },
  ];

  return {
    subject: `New contact enquiry from ${data.firstName}`,
    text: buildTextBody("New contact enquiry", rows),
    html: `<h2 style="font-family:Arial,sans-serif;color:#111;">New contact enquiry</h2>${buildHtmlTable(rows)}`,
    replyTo: data.email,
  };
}
