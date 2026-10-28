import { NextResponse } from "next/server";
import { z } from "zod";
import { buildContactEmail } from "@/lib/contact-email";
import { isContactRateLimited } from "@/lib/contact-rate-limit";
import {
  createSmtpTransporter,
  getDefaultMailFrom,
  getDefaultMailTo,
} from "@/lib/smtp";
import { verifyTurnstileToken } from "@/lib/turnstile";

const noLineBreaks = (value) => !/[\r\n]/.test(value);

const contactSchema = z.object({
  firstName: z.string().trim().min(1).max(80).refine(noLineBreaks),
  email: z.string().trim().max(254).email().refine(noLineBreaks),
  phone: z
    .string()
    .trim()
    .max(25)
    .regex(/^[0-9+\-() ]*$/)
    .optional(),
  message: z.string().trim().min(1).max(2000),
  turnstileToken: z.string().trim().min(1),
  website: z.string().optional(),
});

function clientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function badRequest() {
  return NextResponse.json(
    { error: "Please fill in all required fields with valid information." },
    { status: 400 }
  );
}

export async function POST(request) {
  const ip = clientIp(request);
  if (isContactRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json().catch(() => null);
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) return badRequest();

    if (parsed.data.website?.trim()) {
      return NextResponse.json({ success: true });
    }

    const turnstileOk = await verifyTurnstileToken(parsed.data.turnstileToken, ip);
    if (!turnstileOk) {
      return NextResponse.json(
        { error: "Please complete the verification and try again." },
        { status: 400 }
      );
    }

    const payload = {
      firstName: parsed.data.firstName.replace(/[\r\n]+/g, ""),
      email: parsed.data.email,
      phone: parsed.data.phone,
      message: parsed.data.message,
    };
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
    if (error?.code === "contact_mail_config") {
      console.error("contact_mail_config");
    } else {
      console.error("contact_send_failed", error instanceof Error ? error.message : "");
    }
    return NextResponse.json(
      { error: "Unable to send your message right now. Please try again later." },
      { status: 500 }
    );
  }
}
