"use client";

import PageBase from "@/components/PageBase";
import TransparenciaSection from "@/components/TransparenciaSection";

export default function PlanejamentoPage() {
  return (
    <PageBase
      titulo="Planejamento e Orçamento"
      subtitulo="Instrumentos de planejamento e peças orçamentárias relacionadas ao IPPUR."
    >
      <TransparenciaSection
        titulo="Instrumentos de Planejamento"
        descricao="O IPPUR participa da elaboração e acompanhamento dos instrumentos de planejamento governamental."
      >
        <ul className="list-disc ml-6 text-neutral-dark space-y-2">
          <li>Planos Plurianuais (PPA).</li>
          <li>Leis de Diretrizes Orçamentárias (LDO).</li>
          <li>Leis Orçamentárias Anuais (LOA).</li>
        </ul>
      </TransparenciaSection>

      <TransparenciaSection
        titulo="Relatórios de Execução"
        descricao="Relatórios periódicos podem demonstrar a execução física e financeira de programas e ações."
      >
        <p className="text-neutral-dark">
          Os relatórios de execução orçamentária e de acompanhamento de metas
          podem ser publicados nesta seção ou vinculados ao Portal de
          Transparência oficial do município/estado.
        </p>
      </TransparenciaSection>
    </PageBase>
  );
}
