import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/motion/SmoothScrollProvider";
import CustomCursor from "@/components/motion/CustomCursor";
import Loader from "@/components/motion/Loader";
import MotionProvider from "@/components/motion/MotionProvider";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700"],
  display: "swap",
});

export const metadata = {
  title: "Ian John Samson — Front-End Developer",
  description:
    "Front-end developer building responsive, motion-rich web experiences.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body>
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Loader />
          <CustomCursor />
          <Nav />
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
