"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <section
      className="relative h-[70vh] w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/banner.png')" }}
    >
      {/* 🌓 Sobreposição escura */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* 🏛️ Conteúdo do banner */}
      <motion.div
        className="relative z-10 text-center px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 drop-shadow-lg">
          Planejamento e Desenvolvimento Sustentável
        </h1>
        <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto mb-8 drop-shadow">
          O IPPUR atua na construção de uma Redenção mais organizada, inclusiva e sustentável.
        </p>
        <Link
          href="/sobre"
          className="inline-block bg-secondary text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-secondary-light transition"
        >
          Saiba mais sobre o IPPUR
        </Link>
      </motion.div>

      {/* 🔹 Linha decorativa inferior */}
      <div className="absolute bottom-0 left-0 w-full h-3 bg-primary"></div>
    </section>
  );
}
