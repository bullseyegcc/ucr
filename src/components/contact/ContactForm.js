"use client";

import { useEffect, useRef, useState } from "react";
import { submitContactForm } from "@/lib/submit-contact-form";

const inputClassName =
  "w-full px-0 py-2 lg:py-3 border-b text-xs lg:text-sm focus:outline-none focus:shadow-sm bg-white placeholder-gray-400 transition-all duration-300";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const FIELD_NAMES = ["firstName", "email", "phone", "message"];

const EMPTY_VALUES = {
  firstName: "",
  email: "",
  phone: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+\-() ]*$/;

function fieldError(name, value) {
  const trimmed = value.trim();

  if (name === "firstName") {
    if (!trimmed) return "Please enter your first name.";
    if (trimmed.length > 80) return "First name must be 80 characters or fewer.";
    return "";
  }

  if (name === "email") {
    if (!trimmed) return "Please enter your email address.";
    if (trimmed.length > 254) return "Email must be 254 characters or fewer.";
    if (!EMAIL_PATTERN.test(trimmed)) return "Please enter a valid email address.";
    return "";
  }

  if (name === "phone") {
    if (!trimmed) return "";
    if (trimmed.length > 25) return "Phone must be 25 characters or fewer.";
    if (!PHONE_PATTERN.test(trimmed)) return "Use only numbers, spaces, and + - ( ).";
    return "";
  }

  if (name === "message") {
    if (!trimmed) return "Please enter a message.";
    if (trimmed.length > 2000) return "Message must be 2,000 characters or fewer.";
    return "";
  }

  return "";
}

function validateValues(values) {
  return FIELD_NAMES.reduce((errors, name) => {
    errors[name] = fieldError(name, values[name]);
    return errors;
  }, {});
}

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY_VALUES);
  const [errors, setErrors] = useState(EMPTY_VALUES);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef(null);
  const widgetIdRef = useRef(null);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !turnstileRef.current) return undefined;

    let cancelled = false;

    const renderWidget = () => {
      if (cancelled || !turnstileRef.current || !window.turnstile || widgetIdRef.current != null) {
        return;
      }
      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token) => setTurnstileToken(token),
        "expired-callback": () => setTurnstileToken(""),
        "error-callback": () => setTurnstileToken(""),
      });
    };

    let script = document.getElementById("cf-turnstile-script");
    if (!script) {
      script = document.createElement("script");
      script.id = "cf-turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    if (window.turnstile) renderWidget();
    else script.addEventListener("load", renderWidget);

    return () => {
      cancelled = true;
      script.removeEventListener("load", renderWidget);
      if (window.turnstile && widgetIdRef.current != null) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, []);

  const showError = (name) => Boolean(touched[name] && errors[name]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (status === "success") setStatus("idle");
    if (touched[name]) {
      setErrors((current) => ({ ...current, [name]: fieldError(name, value) }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
    setErrors((current) => ({ ...current, [name]: fieldError(name, value) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    const nextErrors = validateValues(values);
    setErrors(nextErrors);
    setTouched({ firstName: true, email: true, phone: true, message: true });

    const firstInvalid = FIELD_NAMES.find((name) => nextErrors[name]);
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      setStatus("idle");
      return;
    }

    if (!turnstileToken) {
      setStatus("error");
      setErrorMessage("Please complete the verification and try again.");
      return;
    }

    setStatus("submitting");

    try {
      await submitContactForm({
        firstName: values.firstName,
        email: values.email,
        phone: values.phone,
        message: values.message,
        turnstileToken,
        website: String(new FormData(event.currentTarget).get("website") ?? ""),
      });

      setStatus("success");
      setValues(EMPTY_VALUES);
      setErrors(EMPTY_VALUES);
      setTouched({});
      setTurnstileToken("");
      if (window.turnstile && widgetIdRef.current != null) {
        window.turnstile.reset(widgetIdRef.current);
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to send your message. Please try again."
      );
    }
  };

  const fieldClassName = (name, extra = "") =>
    [
      inputClassName,
      showError(name)
        ? "border-[#8b1e1e] focus:border-[#8b1e1e]"
        : "border-gray-300 focus:border-[#FA6E43]",
      extra,
    ]
      .filter(Boolean)
      .join(" ");

  const renderError = (name) =>
    showError(name) ? (
      <p id={`${name}-error`} className="mt-1 text-[11px] lg:text-xs text-[#8b1e1e]">
        {errors[name]}
      </p>
    ) : null;

  return (
    <>
      <form className="space-y-3 lg:space-y-5" onSubmit={handleSubmit} noValidate>
        <div hidden aria-hidden="true">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div>
          <input
            id="firstName"
            type="text"
            name="firstName"
            placeholder="First Name"
            maxLength={80}
            autoComplete="given-name"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={showError("firstName")}
            aria-describedby={showError("firstName") ? "firstName-error" : undefined}
            className={fieldClassName("firstName")}
          />
          {renderError("firstName")}
        </div>

        <div>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            maxLength={254}
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={showError("email")}
            aria-describedby={showError("email") ? "email-error" : undefined}
            className={fieldClassName("email")}
          />
          {renderError("email")}
        </div>

        <div>
          <input
            id="phone"
            type="tel"
            name="phone"
            placeholder="Phone"
            maxLength={25}
            autoComplete="tel"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={showError("phone")}
            aria-describedby={showError("phone") ? "phone-error" : undefined}
            className={fieldClassName("phone")}
          />
          {renderError("phone")}
        </div>

        <div>
          <textarea
            id="message"
            name="message"
            placeholder="Message"
            rows={4}
            maxLength={2000}
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={showError("message")}
            aria-describedby={showError("message") ? "message-error" : undefined}
            className={fieldClassName("message", "resize-none")}
          />
          {renderError("message")}
        </div>

        {TURNSTILE_SITE_KEY ? (
          <div ref={turnstileRef} className="min-h-[65px]" />
        ) : (
          <p className="rounded-2xl bg-[#fff8e8] px-4 py-3 text-sm text-[#7a5b00]">
            Verification is not configured. Set NEXT_PUBLIC_TURNSTILE_SITE_KEY and
            TURNSTILE_SECRET_KEY, then restart the app.
          </p>
        )}

        {status === "success" ? (
          <p className="rounded-2xl bg-[#f3faf3] px-4 py-3 text-sm text-[#1f5f2d]">
            Thanks for reaching out. Your message has been sent successfully.
          </p>
        ) : null}

        {status === "error" ? (
          <p className="rounded-2xl bg-[#fff1f1] px-4 py-3 text-sm text-[#8b1e1e]">
            {errorMessage}
          </p>
        ) : null}

        <div className="pt-4 lg:pt-8">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-black hover:bg-[#FA6E43] text-white py-3 lg:py-4 rounded-full font-semibold text-xs lg:text-sm transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "Sending..." : "Submit"}
          </button>
        </div>
      </form>

      <p className="text-gray-600 text-xs lg:text-sm text-center mt-3 lg:mt-6 leading-tight lg:leading-relaxed">
        By submitting, you agree to our{" "}
        <a href="#" className="underline hover:text-[#FA6E43] transition-colors duration-300">
          Terms & Privacy Policy
        </a>
      </p>
    </>
  );
}
