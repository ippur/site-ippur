"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-12 pb-6 mt-20 border-t-4 border-secondary">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10 items-center">
        {/* 🏛️ Bloco institucional */}
        <div>
          <h3 className="text-2xl font-serif font-semibold mb-3">IPPUR</h3>
          <p className="text-sm text-gray-100 leading-relaxed">
            Instituto de Pesquisa, Planejamento Urbano e Desenvolvimento Sustentável de
            Redenção – PA.
          </p>
        </div>

        {/* 📍 Informações de contato */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <MapPin size={16} className="text-secondary" />
            <a
              href="https://www.google.com/maps/search/?api=1&query=IPPUR+Redenção+PA"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary-light transition underline-offset-2 hover:underline"
            ></a>
            <span>Rua Benedito C Gomes, 82 - Serrinha, Redenção - PA, 68553-008</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone size={16} className="text-secondary" />
            <span>(94) 99112-2809</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail size={16} className="text-secondary" />
            <Link
              href="mailto:contato@ippur.pa.gov.br"
              className="hover:text-secondary-light transition"
            >
              contato@ippur.pa.gov.br
            </Link>
          </div>
        </div>

        {/* 🪙 Selo lateral direito */}
        <div className="flex justify-end md:justify-center">
          <img
            src="/selo.png"
            alt="Selo Institucional"
            className="h-20 w-auto opacity-90 hover:opacity-100 transition"
          />
        </div>
      </div>

      {/* ⚙️ Linha divisória */}
      <div className="w-full border-t border-white/20 my-6"></div>

      {/* 📄 Rodapé final */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:justify-between justify-center items-center gap-3 text-sm text-gray-200">
        <p className="text-center">
          © {ano} Instituto de Pesquisa, Planejamento Urbano e Desenvolvimento Sustentável
          de Redenção – IPPUR.
        </p>

        {/* 🔒 Link discreto para área administrativa */}
        <Link
          href="/admin/login"
          className="text-xs text-gray-200/80 hover:text-secondary-light transition"
        >
          Acesso Restrito
        </Link>
      </div>
    </footer>
  );
}
