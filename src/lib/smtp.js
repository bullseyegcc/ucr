import nodemailer from "nodemailer";

function requireEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getSmtpConfig(overrides = {}) {
  const port = Number(process.env.SMTP_PORT ?? "465");
  const secure =
    process.env.SMTP_SECURE === "true" ||
    (process.env.SMTP_SECURE !== "false" && port === 465);

  return {
    host: process.env.SMTP_HOST ?? "business701-1.web-hosting.com",
    port,
    secure,
    auth: {
      user: requireEnv("SMTP_USER"),
      pass: requireEnv("SMTP_PASS"),
    },
    ...overrides,
  };
}

export function createSmtpTransporter(config) {
  return nodemailer.createTransport(config ?? getSmtpConfig());
}

export function getDefaultMailFrom() {
  return process.env.SMTP_FROM ?? requireEnv("SMTP_USER");
}

export function getDefaultMailTo() {
  return process.env.SMTP_TO ?? "jahangeer9182@gmail.com";
}
