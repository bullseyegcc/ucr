import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SequentialSlideIn from "../../animations/SequentialSlideIn";

function formatCardDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
}

const imageSizes = [
  "h-[280px] sm:h-[320px] lg:h-[380px]",
  "h-[180px] sm:h-[200px] lg:h-[220px]",
  "h-[240px] sm:h-[270px] lg:h-[300px]",
];

export default function BlogsListingSection({
  posts = [],
  limit,
  showViewAll = false,
}) {
  if (!posts?.length) return null;

  const items = typeof limit === "number" ? posts.slice(0, limit) : posts;

  return (
    <section className="relative overflow-hidden bg-[#F3F3F3] px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
      <div className="pointer-events-none absolute -bottom-32 -right-16 h-[420px] w-[420px] rounded-full bg-[#FA6E43]/30 blur-[110px]" />

      <div className="relative mx-auto w-full max-w-[1440px]">
        <div className="mb-12 lg:mb-16">
          <p className="mb-3 text-[13px] font-medium uppercase tracking-[0.16em] text-[#FA6E43] lg:text-[15px]">
            Our blogs_
          </p>
          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2 lg:gap-10">
            <h2 className="max-w-[640px] text-[32px] font-medium leading-[1.12] tracking-[-0.04em] text-black lg:text-[52px] lg:leading-[1.12]">
              Latest news & insights
            </h2>
            <p className="max-w-[340px] text-[15px] font-normal leading-[1.55] text-[#6B6B72] lg:ml-auto lg:pt-2 lg:text-[18px] lg:leading-[1.5]">
              Dive deep into fresh ideas, expert advice, and behind-the-scenes thinking.
            </p>
          </div>
        </div>

        <SequentialSlideIn
          className="grid grid-cols-1 items-start gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10"
          itemClassName="self-start"
          start="top 85%"
          end="bottom 70%"
        >
          {items.map((item, index) => (
            <Link key={item.slug} href={`/blogs/${item.slug}`} className="group block">
              <div className="overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={800}
                  height={500}
                  className={`${imageSizes[index % imageSizes.length]} w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]`}
                />
              </div>
              <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.12em] text-[#A3A3A3]">
                {formatCardDate(item.date)}
              </p>
              <h3 className="mt-2 text-[18px] font-semibold leading-[1.3] tracking-[-0.02em] text-black lg:text-[22px]">
                {item.title}
              </h3>
              <p className="mt-2 line-clamp-1 text-[14px] leading-[1.6] text-[#8A8A8A]">
                {item.excerpt}
              </p>
            </Link>
          ))}
        </SequentialSlideIn>

        {showViewAll && (
          <div className="mt-14 flex justify-center lg:mt-20">
            <Link
              href="/blogs"
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#FA6E43] px-8 py-3.5 text-[16px] font-normal text-white transition-colors hover:bg-[#ff8a5c] sm:px-10 sm:text-[18px]"
            >
              View all news
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
