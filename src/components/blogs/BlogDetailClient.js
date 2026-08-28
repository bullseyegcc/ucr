"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CalendarDays, Check, Copy, Link2 } from "lucide-react";

function getInitials(name) {
  if (!name) return "U";
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function FacebookIcon({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M13.5 9H16V6h-2.5C11.57 6 10 7.57 10 9.5V11H8v3h2v7h3v-7h2.1l.9-3H13v-1.5c0-.28.22-.5.5-.5Z" />
    </svg>
  );
}

function XIcon({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M14.7 10.35 22.04 2h-1.74l-6.37 7.24L8.85 2H2.4l7.7 10.9L2.4 22h1.74l6.73-7.65L15.15 22h6.45l-6.9-11.65Zm-2.38 2.7-.78-1.08-6.2-8.6h2.67l5 6.93.78 1.08 6.5 9.02h-2.67l-5.3-7.35Z" />
    </svg>
  );
}

function LinkedInIcon({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M6.94 8.5H4.1V20h2.84V8.5ZM5.52 4C4.57 4 3.8 4.78 3.8 5.73c0 .94.77 1.72 1.72 1.72.94 0 1.71-.78 1.71-1.72C7.23 4.78 6.46 4 5.52 4ZM20 20h-2.83v-5.6c0-1.34-.03-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95V20H10.33V8.5h2.72v1.57h.04c.38-.72 1.3-1.48 2.68-1.48 2.86 0 3.23 1.88 3.23 4.33V20Z" />
    </svg>
  );
}

function SectionMediaBlock({ image, imageNote }) {
  return (
    <div className="mt-8">
      <div className="overflow-hidden rounded-[18px]">
        <Image
          src={image.src}
          alt={image.alt}
          width={1050}
          height={360}
          className="h-auto max-h-[360px] w-full object-cover sm:max-h-[500px]"
        />
      </div>

      {imageNote ? (
        <blockquote className="mt-4 rounded-lg border-l-4 border-[#FE5D0A] bg-[#f3f3f3] px-6 py-5 text-center text-[0.98rem] italic leading-7 text-[#4b4b52]">
          {imageNote}
        </blockquote>
      ) : null}
    </div>
  );
}

export default function BlogDetailClient({ post }) {
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const authorName = post.author || "Union Copper Rod";
  const publishedAt = formatDate(post.date);

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl || window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(post.title);

  return (
    <section className="bg-white pb-8 pt-16 sm:pt-36">
      <div className="mx-auto w-full max-w-[1800px] px-5 sm:px-8 lg:px-16">
        <header className="relative">
          <div className="mx-auto flex min-h-[400px] max-w-[1050px] flex-col items-center justify-center py-8 text-center sm:py-12">
            <h1 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-[#171717] sm:text-5xl md:text-6xl">
              {post.title}
            </h1>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-[#5e5e63]">
              <div className="inline-flex items-center gap-2.5">
                {post.authorImage ? (
                  <Image
                    src={post.authorImage}
                    alt={authorName}
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#111827] text-[11px] font-semibold tracking-wide text-white">
                    {getInitials(authorName)}
                  </span>
                )}
                <span>{authorName}</span>
              </div>

              {publishedAt && (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays size={14} aria-hidden />
                  {publishedAt}
                </span>
              )}
            </div>

            {/* {post.excerpt && (
              <p className="mt-4 max-w-[600px] text-base leading-7 text-[#6b6b72]">
                {post.excerpt}
              </p>
            )} */}
          </div>

          <aside className="mt-7 self-end rounded-2xl border border-black/5 bg-white p-4 shadow-[0_12px_32px_rgba(20,20,20,0.08)] sm:mx-auto sm:max-w-[420px] lg:absolute lg:bottom-2 lg:right-0 lg:mt-0 lg:w-[300px] lg:max-w-none">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7a7a7d]">
              Share this
            </p>
            <div className="mt-3 flex items-center gap-3 text-[#404046]">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Facebook"
                className="rounded-full border border-black/10 p-2 transition-colors hover:bg-black hover:text-white"
              >
                <FacebookIcon />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on X"
                className="rounded-full border border-black/10 p-2 transition-colors hover:bg-black hover:text-white"
              >
                <XIcon />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
                className="rounded-full border border-black/10 p-2 transition-colors hover:bg-black hover:text-white"
              >
                <LinkedInIcon />
              </a>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-full border border-black/10 bg-[#fafafa] p-1.5 pl-3">
              <Link2 size={14} className="text-[#7a7a7d]" aria-hidden />
              <input
                readOnly
                value={shareUrl}
                aria-label="Article link"
                className="min-w-0 flex-1 bg-transparent text-xs text-[#4f4f55] outline-none"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 rounded-full bg-[#0f172a] px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-80"
              >
                {copied ? (
                  <Check size={13} aria-hidden />
                ) : (
                  <Copy size={13} aria-hidden />
                )}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </aside>
        </header>

        {post.image && (
          <div className="overflow-hidden rounded-[22px] sm:mt-12">
            <Image
              src={post.image}
              alt={post.title}
              width={1320}
              height={760}
              priority
              className="h-auto max-h-[550px] w-full object-cover"
            />
          </div>
        )}

        <article className="mx-auto mt-12 w-full text-[#2d2d31] lg:max-w-[1050px]">
          {post.contentHtml ? (
            <div
              className="wp-content"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          ) : (
            post.content?.map((block, index) => {
              if (block.type === "heading") {
                return (
                  <h2
                    key={`${block.type}-${index}`}
                    className="pt-10 text-3xl font-semibold leading-[1.2] tracking-[-0.015em] text-[#111111] first:pt-0"
                  >
                    {block.text}
                  </h2>
                );
              }

              if (block.type === "paragraph") {
                return (
                  <p
                    key={`${block.type}-${index}`}
                    className="mt-5 text-[1.01rem] leading-8 text-[#4b4b52] first:mt-0"
                  >
                    {block.text}
                  </p>
                );
              }

              if (
                block.type === "image" &&
                block.src &&
                block.src !== post.image
              ) {
                return (
                  <SectionMediaBlock
                    key={`${block.type}-${index}`}
                    image={{
                      src: block.src,
                      alt: block.alt || post.title,
                    }}
                  />
                );
              }

              return null;
            })
          )}
        </article>
      </div>
    </section>
  );
}
