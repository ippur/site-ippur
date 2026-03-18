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
    { titulo: "REURB", icon: "🏗️", link: "/transparencia/reurb" },
    {
      titulo: "Transparência RH",
      icon: "👥",
      desc: "Consulte servidores, diárias e demais dados públicos disponibilizados à população.",
      href: "https://rpmsolucoes.com.br/wc/transparenciarh.aspx?idCNPJ=16366277000172",
      externo: true,
      destaque: false,
    },
  ];

  return (
    <PageBase
      titulo="Portal da Transparência"
      subtitulo="Acompanhe informações e documentos oficiais do IPPUR em atendimento à Lei de Acesso à Informação."
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {secoes.map((secao, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="h-full"
          >
            {secao.externo ? (
              <a
                href={secao.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-white border rounded-xl shadow-card hover:shadow-smooth transition-all p-6 text-center flex flex-col items-center justify-center h-full min-h-[210px] cursor-pointer hover:scale-[1.02] ${
                  secao.destaque
                    ? "border-secondary bg-secondary/5 hover:border-secondary"
                    : "border-neutral-light hover:border-secondary"
                }`}
              >
                <span className="text-4xl mb-3">{secao.icon}</span>
                <p className="text-lg font-semibold text-primary-dark mb-2">
                  {secao.titulo}
                </p>
                <p className="text-sm text-neutral-dark max-w-[280px]">
                  {secao.desc}
                </p>
              </a>
            ) : (
              <Link
                href={secao.link}
                className="bg-white border border-neutral-light rounded-xl shadow-card hover:shadow-smooth transition-all p-6 text-center flex flex-col items-center justify-center h-full min-h-[210px] cursor-pointer hover:scale-[1.02] hover:border-secondary"
              >
                <span className="text-4xl mb-3">{secao.icon}</span>
                <p className="text-lg font-semibold text-primary-dark">
                  {secao.titulo}
                </p>
              </Link>
            )}
          </motion.div>
        ))}
      </div>
    </PageBase>
  );
}