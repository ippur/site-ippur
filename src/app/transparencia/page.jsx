"use client";
import PageBase from "@/components/PageBase";

export default function Transparencia() {
  return (
    <PageBase
      titulo="Transparência"
      subtitulo="Acesso às informações públicas, relatórios e documentos oficiais."
    >
      <ul className="space-y-4 text-neutral-dark">
        <li>
          📑 <a href="#" className="text-primary hover:text-secondary transition">Relatório de Atividades 2024</a>
        </li>
        <li>
          💰 <a href="#" className="text-primary hover:text-secondary transition">Demonstrativo Financeiro – 1º Semestre</a>
        </li>
        <li>
          📊 <a href="#" className="text-primary hover:text-secondary transition">Plano Plurianual de Investimentos 2025</a>
        </li>
        <li>
          🧾 <a href="#" className="text-primary hover:text-secondary transition">Licitações e Contratos Vigentes</a>
        </li>
      </ul>
    </PageBase>
  );
}
