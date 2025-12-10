"use client";

import { motion } from "framer-motion";

export default function TransparenciaSection({ titulo, descricao, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="bg-white border border-neutral-light rounded-xl shadow-card p-8"
    >
      <h2 className="text-2xl font-bold text-primary-dark mb-3">{titulo}</h2>
      <p className="text-neutral-dark mb-6">{descricao}</p>
      
      {/* Conteúdo específico da seção */}
      {children}
    </motion.div>
  );
}
