"use client";

import HeroBanner from "@/components/HeroBanner";
import QuickLinks from "@/components/QuickLinks";
import SobreResumo from "@/components/SobreResumo";
import CardNoticia from "@/components/CardNoticia";
import { motion } from "framer-motion";

export default function Home() {
  const noticias = [
    {
      id: 1,
      titulo: "Novo projeto de urbanização iniciado",
      resumo:
        "IPPUR inicia novo projeto de urbanização sustentável no bairro Novo Horizonte.",
      imagem: "/noticia1.jpg",
    },
    {
      id: 2,
      titulo: "Audiência pública sobre planejamento urbano",
      resumo:
        "População é convidada a participar das discussões sobre o plano diretor da cidade.",
      imagem: "/noticia2.jpg",
    },
  ];

  return (
    <>
      {/* 🏙️ Banner institucional */}
      <HeroBanner />

      {/* 📰 Últimas Notícias */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <motion.h2
          className="text-3xl md:text-4xl font-serif font-bold text-primary-dark mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Últimas Notícias
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {noticias.map((n, i) => (
            <CardNoticia key={n.id} noticia={n} index={i} />
          ))}
        </div>

        {/* 🔗 Botão "Ver todas" */}
        <div className="text-center mt-12">
          <motion.a
            href="/noticias"
            className="inline-block bg-primary text-white font-medium px-8 py-3 rounded-lg hover:bg-primary-light transition"
            whileHover={{ scale: 1.05 }}
          >
            Ver todas as notícias
          </motion.a>
        </div>
      </section>

      {/* ⚙️ Divisor decorativo */}
      <div className="w-full h-[3px] bg-gradient-to-r from-primary via-secondary to-primary/60 mb-16"></div>

      {/* 🔗 Acesso Rápido */}
      <QuickLinks />

      {/* 🧭 Seção “Sobre o IPPUR” */}
      <SobreResumo />
    </>
  );
}
