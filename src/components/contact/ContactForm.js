"use client";

import { useEffect, useRef, useState } from "react";
import { submitContactForm } from "@/lib/submit-contact-form";

const inputClassName =
  "w-full px-0 py-2 lg:py-3 border-b border-gray-300 text-xs lg:text-sm focus:outline-none focus:border-[#FA6E43] focus:shadow-sm bg-white placeholder-gray-400 transition-all duration-300";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function ContactForm() {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    if (!turnstileToken) {
      setStatus("error");
      setErrorMessage("Please complete the verification and try again.");
      return;
    }

    const formEl = event.currentTarget;
    const formData = new FormData(formEl);

    try {
      await submitContactForm({
        firstName: String(formData.get("firstName") ?? ""),
        email: String(formData.get("email") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        message: String(formData.get("message") ?? ""),
        turnstileToken,
        website: String(formData.get("website") ?? ""),
      });

      setStatus("success");
      formEl.reset();
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

  return (
    <>
      <form className="space-y-3 lg:space-y-5" onSubmit={handleSubmit}>
        <div hidden aria-hidden="true">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            maxLength={80}
            className={inputClassName}
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            maxLength={254}
            className={inputClassName}
          />
        </div>

        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            maxLength={25}
            className={inputClassName}
          />
        </div>

        <div>
          <textarea
            name="message"
            placeholder="Message"
            rows={4}
            required
            maxLength={2000}
            className={`${inputClassName} resize-none`}
          />
        </div>

        <div ref={turnstileRef} />

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
