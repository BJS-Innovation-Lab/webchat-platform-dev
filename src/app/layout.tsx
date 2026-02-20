import type { Metadata } from "next";
import { Syne, Outfit } from "next/font/google";
import "./globals.css";

// Syne - Dramatic, geometric, memorable display font
const syne = Syne({ 
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

// Outfit - Modern, clean body font
const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "VULKN - Deploy in 6 Days What Takes Others 6 Months",
  description: "The autonomous AI platform that builds, operates, and scales your entire digital business. Harvard Innovation Labs partner.",
  openGraph: {
    title: "VULKN - Enterprise AI Platform",
    description: "Deploy in 6 days what takes others 6 months.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${outfit.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
