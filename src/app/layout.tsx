import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { ReactNode } from "react";

export const metadata = {
  title: "IPPUR - Instituto de Planejamento Urbano e Desenvolvimento Sustentável de Redenção",
  description: "Portal institucional do IPPUR Redenção-PA: planejamento urbano, transparência, licitações e desenvolvimento sustentável.",
  keywords: ["IPPUR", "Redenção", "planejamento urbano", "transparência pública", "licitações"],
  openGraph: {
    title: "IPPUR Redenção-PA",
    description: "Planejamento e desenvolvimento sustentável para Redenção.",
    url: "https://site-ippur.vercel.app",
    siteName: "IPPUR",
    images: ["/banner.jpg"],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
