export async function submitContactForm(payload) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => null));

  if (!response.ok) {
    throw new Error(data?.error ?? "Failed to send your message. Please try again.");
  }

  return data;
}
