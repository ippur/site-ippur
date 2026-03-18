"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CardNoticia({ noticia }) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-card border border-neutral-medium overflow-hidden hover:shadow-smooth transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* 🖼️ Imagem da notícia */}
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={noticia.imagem}
          alt={noticia.titulo}
          className="h-full w-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
        {/* 🔹 Etiqueta “Notícia” */}
        <span className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          Notícia
        </span>
      </div>

      {/* 📰 Conteúdo */}
      <div className="p-6 flex flex-col justify-between">
        <h3 className="text-xl font-semibold text-primary-dark mb-2">
          {noticia.titulo}
        </h3>
        <p className="text-neutral-dark text-sm leading-relaxed mb-4">
          {noticia.resumo}
        </p>
        <Link
          href="/noticias"
          className="self-start text-sm font-medium text-secondary hover:text-secondary-light transition-colors"
        >
          Ler mais →
        </Link>
      </div>
    </motion.div>
  );
}