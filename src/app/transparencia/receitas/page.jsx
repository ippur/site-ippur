"use client";

import PageBase from "@/components/PageBase";
import TransparenciaSection from "@/components/TransparenciaSection";

export default function ReceitasPage() {
  return (
    <PageBase
      titulo="Receitas Públicas"
      subtitulo="Origem dos recursos utilizados nas ações do IPPUR."
    >
      <TransparenciaSection
        titulo="Fontes de Recursos"
        descricao="As receitas vinculadas às ações do IPPUR podem ter diversas origens."
      >
        <ul className="list-disc ml-6 text-neutral-dark space-y-2">
          <li>Recursos do orçamento municipal/estadual.</li>
          <li>Transferências voluntárias e convênios.</li>
          <li>Parcerias com órgãos federais e organismos internacionais.</li>
        </ul>
      </TransparenciaSection>

      <TransparenciaSection
        titulo="Divulgação das Receitas"
        descricao="Os valores arrecadados e vinculados às ações do IPPUR podem ser consultados em sistemas oficiais de transparência."
      >
        <p className="text-neutral-dark">
          A divulgação detalhada das receitas segue os padrões definidos pelos
          órgãos de finanças públicas e é realizada em conjunto com a
          administração central do município/estado.
        </p>
      </TransparenciaSection>
    </PageBase>
  );
}
