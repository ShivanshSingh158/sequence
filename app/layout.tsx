import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";
import MagneticCursor from "@/components/MagneticCursor";
import SoundControl from "@/components/SoundControl";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ShivansH!!",
  description: "A high-end personal portfolio featuring scroll-linked animations.",
  icons: {
    icon: "/ss_logo.png",
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
        <ScrollToTop />
        <MagneticCursor />
        <SoundControl />
        {children}
      </body>
    </html>
  );
}
