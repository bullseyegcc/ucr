/**
 * Shared content shell — matches Navbar horizontal alignment.
 * Use for section wrappers that should line up with the header.
 * Full-bleed heroes/media stay outside this shell.
 */
export const SITE_SHELL =
  "mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[3rem] xl:px-[4rem] 2xl:px-[5rem]";

/**
 * Width for absolute/centered overlap media so its left/right edges
 * match SITE_SHELL content (same paddings as the header).
 */
export const SITE_SHELL_MEDIA =
  "w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] lg:w-[min(calc(100%-6rem),calc(1600px-6rem))] xl:w-[min(calc(100%-8rem),calc(1600px-8rem))] 2xl:w-[min(calc(100%-10rem),calc(1600px-10rem))]";
