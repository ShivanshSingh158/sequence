import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";
import MagneticCursor from "@/components/MagneticCursor";
import SoundControl from "@/components/SoundControl";
import GrainOverlay from "@/components/GrainOverlay";
import Preloader from "@/components/Preloader";
import Dock from "@/components/Dock";
import SmoothScroll from "@/components/SmoothScroll";
import PullToRefresh from "@/components/PullToRefresh";
import ThemeToggle from "@/components/ThemeToggle";
import DevModeToggle from "@/components/DevModeToggle";
import DevOverlay from "@/components/DevOverlay";
import { LoadingProvider } from "@/context/LoadingContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { DevModeProvider } from "@/context/DevModeContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ShivansH!!",
  description: "A high-end personal portfolio featuring scroll-linked animations.",
  icons: {
    icon: "/ss_logo.png",
  },
  openGraph: {
    title: "ShivansH!! - Creative Developer",
    description: "Building immersive web experiences with Next.js and WebGL.",
    url: "https://shivanshsingh-portfolio.vercel.app",
    siteName: "ShivansH!!",
    images: [
      {
        url: "/ss_logo.png", // Fallback to logo, ideally a dedicated og-image.png
        width: 800,
        height: 600,
        alt: "ShivansH!! Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShivansH!! - Creative Developer",
    description: "Building immersive web experiences with Next.js and WebGL.",
    images: ["/ss_logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          <DevModeProvider>
            <LoadingProvider>
              <SmoothScroll />
              <PullToRefresh />
              <ScrollToTop />
              <MagneticCursor />
              <SoundControl />
              <ThemeToggle />
              <DevModeToggle />
              <DevOverlay />
              <GrainOverlay />
              <Preloader />
              <Dock />
              {children}
            </LoadingProvider>
          </DevModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
