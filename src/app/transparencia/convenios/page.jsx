"use client";

import PageBase from "@/components/PageBase";
import TransparenciaSection from "@/components/TransparenciaSection";

export default function ConveniosPage() {
  return (
    <PageBase
      titulo="Convênios e Parcerias"
      subtitulo="Acordos firmados pelo IPPUR com outras instituições."
    >
      <TransparenciaSection
        titulo="Convênios"
        descricao="Instrumentos firmados com órgãos públicos, universidades e entidades parceiras para execução de projetos."
      >
        <ul className="list-disc ml-6 text-neutral-dark space-y-2">
          <li>Termos de cooperação técnica.</li>
          <li>Convênios com repasse de recursos.</li>
          <li>Parcerias voltadas para planejamento urbano e pesquisas.</li>
        </ul>
      </TransparenciaSection>

      <TransparenciaSection
        titulo="Transparência dos Convênios"
        descricao="As principais informações sobre convênios devem ser publicadas de forma clara."
      >
        <ul className="list-disc ml-6 text-neutral-dark space-y-2">
          <li>Objeto do convênio.</li>
          <li>Partes envolvidas.</li>
          <li>Vigência, valores e contrapartidas.</li>
        </ul>
      </TransparenciaSection>
    </PageBase>
  );
}
