import { NextResponse } from "next/server";
import { buildContactEmail } from "@/lib/contact-email";
import {
  createSmtpTransporter,
  getDefaultMailFrom,
  getDefaultMailTo,
} from "@/lib/smtp";

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function badRequest(message) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function validatePayload(body) {
  if (!body || typeof body !== "object") {
    return null;
  }

  if (!isNonEmptyString(body.firstName)) return null;
  if (!isNonEmptyString(body.email) || !isValidEmail(body.email)) {
    return null;
  }

  return {
    firstName: body.firstName.trim(),
    email: body.email.trim(),
    phone: body.phone?.trim(),
    message: body.message?.trim(),
  };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const payload = validatePayload(body);

    if (!payload) {
      return badRequest("Please fill in all required fields with valid information.");
    }

    const emailContent = buildContactEmail(payload);
    const transporter = createSmtpTransporter();

    await transporter.sendMail({
      from: getDefaultMailFrom(),
      to: getDefaultMailTo(),
      replyTo: emailContent.replyTo,
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form email failed:", error);
    return NextResponse.json(
      { error: "Unable to send your message right now. Please try again later." },
      { status: 500 }
    );
  }
}
