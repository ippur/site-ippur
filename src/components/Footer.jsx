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
            Instituto de Pesquisa, Planejamento Urbano e Desenvolvimento Sustentável de Redenção – PA.
          </p>
        </div>

        {/* 📍 Informações de contato */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <MapPin size={16} className="text-secondary" />
            <span>Rua 13 de Maio, nº 100 - Centro, Redenção - PA</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone size={16} className="text-secondary" />
            <span>(94) 3424-0000</span>
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
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-200">
        <p>
          © {ano} Instituto de Pesquisa, Planejamento Urbano e Desenvolvimento Sustentável de Redenção – IPPUR.
        </p>
        <p className="mt-2 md:mt-0">
          Desenvolvido por{" "}
          <Link
            href="https://habecksystem.com.br"
            target="_blank"
            className="text-secondary hover:text-secondary-light font-medium transition"
          >
            Habeck System Tecnologia
          </Link>
        </p>
      </div>
    </footer>
  );
}
