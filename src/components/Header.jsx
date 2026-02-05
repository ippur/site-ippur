"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { MAINTENANCE_MODE } from "@/lib/maintenance";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Início" },
    { href: "/noticias", label: "Notícias" },
    { href: "/transparencia", label: "Transparência" },
    { href: "/sobre", label: "Sobre" },
    { href: "/contatos", label: "Contatos" },
  ];

  function renderLink(link) {
    if (MAINTENANCE_MODE) {
      return (
        <span
          key={link.href}
          className="text-neutral-medium cursor-not-allowed opacity-50"
          title="Site em manutenção"
        >
          {link.label}
        </span>
      );
    }

    return (
      <Link
        key={link.href}
        href={link.href}
        className="text-neutral-dark font-medium hover:text-secondary transition-colors duration-200"
      >
        {link.label}
      </Link>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b-4 border-primary">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <img src="/logo.png" alt="IPPUR" className="h-12 w-auto" />
        </Link>

        {/* Menu desktop */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map(renderLink)}
        </nav>

        {/* Botão mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-neutral-dark hover:text-primary"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-neutral-medium shadow-lg">
          <ul className="flex flex-col space-y-3 px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                {MAINTENANCE_MODE ? (
                  <span className="block text-neutral-medium opacity-50 cursor-not-allowed">
                    {link.label}
                  </span>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block text-neutral-dark font-medium hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
