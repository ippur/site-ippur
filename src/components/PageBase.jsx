"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PageBase({ titulo, subtitulo, children }) {
  return (
    <main className="flex flex-col min-h-screen">
      {/* 🏛️ Banner superior institucional */}
      <section className="relative bg-gradient-to-r from-primary via-primary-dark to-primary text-white py-16 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-serif font-bold mb-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {titulo}
          </motion.h1>
          {subtitulo && (
            <motion.p
              className="text-gray-100 text-sm md:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              {subtitulo}
            </motion.p>
          )}

          {/* 🧭 Breadcrumb */}
          <motion.div
            className="mt-6 text-sm text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <Link href="/" className="hover:text-secondary transition">
              Início
            </Link>{" "}
            <span className="text-secondary px-1">/</span> {titulo}
          </motion.div>
        </div>

        {/* 🔹 Linha decorativa inferior */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-secondary"></div>
      </section>

      {/* 📄 Conteúdo principal da página */}
      <motion.section
        className="flex-grow max-w-7xl mx-auto px-6 py-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.section>
    </main>
  );
}
