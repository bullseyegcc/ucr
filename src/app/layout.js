import "./globals.css";
import { Navbar } from "../common/Navbar";
import Footer from "@/components/shared/Footer";
import QuoteSection from "@/components/shared/QuoteSection";
import SmoothScroll from "../common/SmoothScroll";
import SplashOverlay from "../common/SplashOverlay";

export const metadata = {
  title: {
    default: "UCR | Shaping the Future of Copper",
    template: "%s | UCR",
  },
  description:
    "UCR leads the region in copper rod production with world-class technology, sustainable practices, and a commitment to excellence.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/HelveticaNowDisplay-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/HelveticaNowDisplay-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased m-0 bg-white">
        <SplashOverlay />
        <SmoothScroll />
        <Navbar/>
        {children}
        <QuoteSection />
        <Footer/>
      </body>
    </html>
  );
}
