"use client";

import Link from "next/link";
import PageBase from "@/components/PageBase";
import { motion } from "framer-motion";

export default function TransparenciaPage() {
  const secoes = [
    { titulo: "Acesso à Informação", icon: "📬", link: "/transparencia/acesso-informacao" },
    { titulo: "Audiências e Participação Popular", icon: "🗣️", link: "/transparencia/audiencias" },
    { titulo: "Convênios e Parcerias", icon: "🤝", link: "/transparencia/convenios" },
    { titulo: "Dados Abertos", icon: "🗂️", link: "/transparencia/dados-abertos" },
    { titulo: "Despesas e Pagamentos", icon: "💸", link: "/transparencia/despesas" },
    { titulo: "Estrutura Organizacional e Servidores", icon: "🏢", link: "/transparencia/estrutura" },
    { titulo: "Licitações e Contratos", icon: "📜", link: "/licitacoes" },
    { titulo: "Planejamento e Orçamento", icon: "📊", link: "/transparencia/planejamento" },
    { titulo: "Receitas Públicas", icon: "💰", link: "/transparencia/receitas" },
    { titulo: "Relatórios e Auditorias", icon: "📑", link: "/transparencia/relatorios" },
  ];

  return (
    <PageBase
      titulo="Portal da Transparência"
      subtitulo="Acompanhe informações e documentos oficiais do IPPUR em atendimento à Lei de Acesso à Informação."
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {secoes.map((secao, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              href={secao.link}
              className="bg-white border border-neutral-light rounded-xl shadow-card hover:shadow-smooth transition-shadow p-6 text-center flex flex-col items-center"
            >
              <span className="text-4xl mb-3">{secao.icon}</span>
              <p className="text-lg font-semibold text-primary-dark mb-1">
                {secao.titulo}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </PageBase>
  );
}
