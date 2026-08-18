"use client";

import { useState } from "react";
import { submitContactForm } from "@/lib/submit-contact-form";

const inputClassName =
  "w-full px-0 py-2 lg:py-3 border-b border-gray-300 text-xs lg:text-sm focus:outline-none focus:border-[#FA6E43] focus:shadow-sm bg-white placeholder-gray-400 transition-all duration-300";

export default function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formEl = event.currentTarget;
    const formData = new FormData(formEl);

    try {
      await submitContactForm({
        firstName: String(formData.get("firstName") ?? ""),
        email: String(formData.get("email") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        message: String(formData.get("message") ?? ""),
      });

      setStatus("success");
      formEl.reset();
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
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            className={inputClassName}
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className={inputClassName}
          />
        </div>

        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            className={inputClassName}
          />
        </div>

        <div>
          <textarea
            name="message"
            placeholder="Message"
            rows={4}
            className={`${inputClassName} resize-none`}
          />
        </div>

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
