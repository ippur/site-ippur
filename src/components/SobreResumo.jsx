"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function SobreResumo() {
  return (
    <section className="relative bg-gradient-to-b from-primary-light/10 to-neutral-light py-20">
      <div className="max-w-6xl mx-auto px-6 text-center md:text-left grid md:grid-cols-2 gap-12 items-center">
        {/* 🏙️ Imagem institucional */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <img
            src="/banner.jpg"
            alt="IPPUR Redenção"
            className="rounded-xl shadow-smooth border border-neutral-medium"
          />
          <div className="absolute inset-0 rounded-xl bg-primary/20"></div>
        </motion.div>

        {/* 🧩 Texto institucional */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-dark">
            Sobre o IPPUR
          </h2>
          <p className="text-neutral-dark leading-relaxed">
            O Instituto de Pesquisa, Planejamento Urbano e Desenvolvimento Sustentável de Redenção – IPPUR –
            é responsável por coordenar ações voltadas ao crescimento ordenado da cidade,
            promovendo políticas públicas sustentáveis e integradas ao bem-estar da população.
          </p>
          <p className="text-neutral-dark leading-relaxed">
            Nossa missão é planejar o desenvolvimento urbano de forma inovadora e participativa,
            garantindo qualidade de vida, mobilidade e preservação ambiental para as futuras gerações.
          </p>

          <Link
            href="/sobre"
            className="inline-block bg-secondary text-white px-6 py-3 rounded-lg shadow-md hover:bg-secondary-light transition"
          >
            Saiba mais
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
