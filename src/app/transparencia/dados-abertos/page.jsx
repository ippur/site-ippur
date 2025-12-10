"use client";

import PageBase from "@/components/PageBase";
import TransparenciaSection from "@/components/TransparenciaSection";

export default function DadosAbertosPage() {
  return (
    <PageBase
      titulo="Dados Abertos"
      subtitulo="Conjuntos de dados disponibilizados em formato aberto para reutilização."
    >
      <TransparenciaSection
        titulo="O que são Dados Abertos?"
        descricao="São bases de dados públicas disponibilizadas em formato aberto, legível por máquina, permitindo livre uso, reutilização e compartilhamento."
      >
        <ul className="list-disc ml-6 text-neutral-dark space-y-2">
          <li>Acesso a dados brutos para pesquisa e análises.</li>
          <li>Formatos não proprietários (CSV, JSON, etc.).</li>
          <li>Licenças que permitam reutilização.</li>
        </ul>
      </TransparenciaSection>

      <TransparenciaSection
        titulo="Catálogo de Dados (em preparação)"
        descricao="O catálogo de dados abertos do IPPUR será estruturado com bases de interesse público."
      >
        <p className="text-neutral-dark">
          Em breve serão disponibilizadas bases de dados referentes a projetos,
          estudos urbanos, indicadores territoriais e outros conjuntos relevantes
          para pesquisadores, gestores e sociedade civil.
        </p>
      </TransparenciaSection>
    </PageBase>
  );
}
