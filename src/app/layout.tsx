import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

// Playfair Display - Elegant, editorial, premium serif
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

// DM Sans - Clean, friendly, modern
const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "VULKN - The Future of Enterprise AI",
  description: "Deploy in 6 days what takes others 6 months. The autonomous AI platform trusted by industry leaders.",
  openGraph: {
    title: "VULKN - The Future of Enterprise AI",
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
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
