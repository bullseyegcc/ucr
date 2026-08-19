"use client";

import { useState } from "react";
import {
  Share2,
  Copy,
  Check,
  Linkedin,
  Facebook,
  Mail,
  X,
} from "lucide-react";

export default function BlogShare({ title }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const url = typeof window !== "undefined" ? window.location.href : "";
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title || "");

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const links = [
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: Share2,
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Facebook,
    },
    {
      label: "Email",
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      icon: Mail,
    },
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] px-5 py-2.5 text-sm text-[#4B4B4B] hover:border-[#FF6A00] hover:text-[#FF6A00] transition-colors"
      >
        <Share2 size={16} />
        Share this
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-medium">Share this</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-1 text-gray-400 hover:text-gray-700"
                aria-label="Close share dialog"
              >
                <X size={20} />
              </button>
            </div>

            <button
              type="button"
              onClick={copyLink}
              className="mb-4 flex w-full items-center justify-between rounded-2xl border border-[#EBEBEB] px-4 py-3 text-left hover:border-[#FF6A00]"
            >
              <span className="truncate pr-3 text-sm text-gray-600">{url}</span>
              {copied ? (
                <Check size={18} className="shrink-0 text-green-600" />
              ) : (
                <Copy size={18} className="shrink-0 text-[#FF6A00]" />
              )}
            </button>

            <div className="grid grid-cols-2 gap-3">
              {links.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-2xl border border-[#EBEBEB] px-4 py-3 text-sm hover:border-[#FF6A00] hover:text-[#FF6A00]"
                >
                  <item.icon size={16} />
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
