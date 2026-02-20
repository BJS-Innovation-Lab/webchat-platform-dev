import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "VULKN - Enterprise AI Platform",
  description: "Deploy in 6 days what takes others 6 months. The autonomous AI platform that builds, operates, and scales your entire digital business.",
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
    <html lang="en" className={`${spaceGrotesk.variable} ${plusJakarta.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
