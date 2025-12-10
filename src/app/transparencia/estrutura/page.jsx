"use client";

import PageBase from "@/components/PageBase";
import TransparenciaSection from "@/components/TransparenciaSection";

export default function EstruturaPage() {
  return (
    <PageBase
      titulo="Estrutura Organizacional e Servidores"
      subtitulo="Informações sobre a organização interna do IPPUR."
    >
      <TransparenciaSection
        titulo="Estrutura Organizacional"
        descricao="O IPPUR é composto por áreas técnicas e administrativas voltadas ao planejamento urbano e à gestão de projetos."
      >
        <ul className="list-disc ml-6 text-neutral-dark space-y-2">
          <li>Direção e coordenações.</li>
          <li>Equipes técnicas de planejamento urbano.</li>
          <li>Setores administrativos e de apoio.</li>
        </ul>
      </TransparenciaSection>

      <TransparenciaSection
        titulo="Servidores e Colaboradores"
        descricao="A relação de cargos, funções e lotações poderá ser disponibilizada de forma detalhada em relatórios específicos."
      >
        <p className="text-neutral-dark">
          Informações sobre servidores efetivos, comissionados e colaboradores
          podem ser disponibilizadas em relatórios próprios, observando a
          legislação de proteção de dados pessoais quando aplicável.
        </p>
      </TransparenciaSection>
    </PageBase>
  );
}
