"use client";
import Link from "next/link";
import PageBase from "@/components/PageBase";

export default function TransparenciaPage() {
  const secoes = [
    { titulo: "📬 Acesso à Informação", link: "/transparencia/acesso-informacao" },
    { titulo: "🗣️ Audiências e Participação Popular", link: "/transparencia/audiencias" },
    { titulo: "🤝 Convênios e Parcerias", link: "/transparencia/convenios" },
    { titulo: "🗂️ Dados Abertos", link: "/transparencia/dados-abertos" },
    { titulo: "💸 Despesas e Pagamentos", link: "/transparencia/despesas" },
    { titulo: "🏢 Estrutura Organizacional e Servidores", link: "/transparencia/estrutura" },
    { titulo: "📜 Licitações e Contratos", link: "/transparencia/licitacoes" },
    { titulo: "📊 Planejamento e Orçamento", link: "/transparencia/planejamento" },
    { titulo: "💰 Receitas Públicas", link: "/transparencia/receitas" },
    { titulo: "📑 Relatórios e Auditorias", link: "/transparencia/relatorios" },
  ];

  return (
    <PageBase titulo="Portal da Transparência" subtitulo="Acompanhe todas as informações públicas do IPPUR">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {secoes.map((secao, i) => (
          <Link
            key={i}
            href={secao.link}
            className="bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 text-center"
          >
            <p className="text-lg font-semibold text-neutral-dark mb-1">{secao.titulo}</p>
          </Link>
        ))}
      </div>
    </PageBase>
  );
}
