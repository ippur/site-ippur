import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { ReactNode } from "react";

const siteUrl = "https://site-ippur.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "IPPUR - Instituto de Planejamento Urbano e Desenvolvimento Sustentável de Redenção",
    template: "%s | IPPUR",
  },
  description:
    "Portal institucional do IPPUR Redenção-PA: planejamento urbano, transparência, licitações e desenvolvimento sustentável.",
  keywords: [
    "IPPUR",
    "Redenção",
    "planejamento urbano",
    "transparência pública",
    "licitações",
  ],
  openGraph: {
    title: "IPPUR Redenção-PA",
    description:
      "Planejamento e desenvolvimento sustentável para Redenção.",
    url: siteUrl,
    siteName: "IPPUR",
    images: ["/banner.jpg"],
    locale: "pt_BR",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col bg-neutral-bg text-neutral-dark">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
