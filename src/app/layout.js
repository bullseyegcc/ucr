import "./globals.css";
import { Navbar } from "../common/Navbar";
import Footer from "../common/footer";
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
      <body className="antialiased m-0 bg-white " >
        <SplashOverlay />
        <SmoothScroll />
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
