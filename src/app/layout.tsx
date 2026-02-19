import type { Metadata, Viewport } from "next";
import { Michroma, Exo_2 } from "next/font/google";
import "./globals.css";

// VULKN Brand Typography
// Michroma: Futuristic, tech-forward display font for headlines and branding
// Exo 2: Modern, highly readable font optimized for Spanish characters
const michroma = Michroma({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400"], // Michroma only has 400 weight
});

const exo2 = Exo_2({
  subsets: ["latin", "latin-ext"], // latin-ext for Spanish characters (ñ, á, é, etc.)
  display: "swap",
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "VULKN - Tu Agente de Negocio",
  description: "Tu agente AI que atiende a tus clientes 24/7. Fácil de usar para PyMEs mexicanas.",
  keywords: ["AI", "chat", "agente", "PyME", "VULKN", "automatización", "México", "negocio"],
  authors: [{ name: "BJS Labs" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "VULKN",
    startupImage: [
      {
        url: "/icons/icon-512x512.png",
        media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)",
      },
    ],
  },
  applicationName: "VULKN",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    title: "VULKN - Tu Agente de Negocio",
    description: "Tu agente AI que atiende a tus clientes 24/7. Fácil de usar para PyMEs mexicanas.",
    type: "website",
    siteName: "VULKN",
    locale: "es_MX",
  },
  twitter: {
    card: "summary_large_image",
    title: "VULKN - Tu Agente de Negocio",
    description: "Tu agente AI que atiende a tus clientes 24/7. Fácil de usar para PyMEs mexicanas.",
  },
  icons: {
    icon: [
      { url: "/icons/icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/icons/icon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icons/icon-128x128.png", sizes: "128x128", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/icons/icon-96x96.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563EB" },
    { media: "(prefers-color-scheme: dark)", color: "#1E40AF" },
  ],
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX" className={`scroll-smooth ${michroma.variable} ${exo2.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
