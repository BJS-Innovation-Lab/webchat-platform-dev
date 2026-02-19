import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VULKN - Enterprise AI Platform",
  description: "Deploy in 6 days what takes others 6 months. VULKN is the autonomous AI platform that builds, operates, and scales your entire digital business.",
  keywords: ["AI", "enterprise", "automation", "business", "VULKN", "platform"],
  authors: [{ name: "BJS Labs" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#000208" },
    { media: "(prefers-color-scheme: dark)", color: "#000208" },
  ],
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
