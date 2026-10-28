import nodemailer from "nodemailer";

function requireMailEnv(name) {
  const value = process.env[name];

  if (!value) {
    const error = new Error("contact_mail_config");
    error.code = "contact_mail_config";
    throw error;
  }

  return value;
}

export function getSmtpConfig(overrides = {}) {
  const port = Number(process.env.SMTP_PORT ?? "465");
  const secure =
    process.env.SMTP_SECURE === "true" ||
    (process.env.SMTP_SECURE !== "false" && port === 465);

  return {
    host: requireMailEnv("SMTP_HOST"),
    port,
    secure,
    auth: {
      user: requireMailEnv("SMTP_USER"),
      pass: requireMailEnv("SMTP_PASS"),
    },
    ...overrides,
  };
}

export function createSmtpTransporter(config) {
  return nodemailer.createTransport(config ?? getSmtpConfig());
}

export function getDefaultMailFrom() {
  return process.env.SMTP_FROM ?? requireMailEnv("SMTP_USER");
}

export function getDefaultMailTo() {
  return requireMailEnv("SMTP_TO");
}
