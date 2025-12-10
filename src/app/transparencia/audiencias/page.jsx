"use client";

import PageBase from "@/components/PageBase";
import TransparenciaSection from "@/components/TransparenciaSection";

export default function AudienciasPage() {
  return (
    <PageBase
      titulo="Audiências e Participação Popular"
      subtitulo="Espaços de diálogo entre o IPPUR e a sociedade."
    >
      <TransparenciaSection
        titulo="Audiências Públicas"
        descricao="As audiências públicas são momentos de escuta e diálogo sobre temas relevantes para o planejamento urbano."
      >
        <ul className="list-disc ml-6 text-neutral-dark space-y-2">
          <li>Discussão de planos, programas e projetos urbanos.</li>
          <li>Apresentação de estudos técnicos e relatórios.</li>
          <li>Registro em ata e publicização dos resultados.</li>
        </ul>
      </TransparenciaSection>

      <TransparenciaSection
        titulo="Como Participar"
        descricao="A população pode acompanhar e participar das audiências públicas."
      >
        <ul className="list-disc ml-6 text-neutral-dark space-y-2">
          <li>Divulgação prévia de datas, horários e locais no site do IPPUR.</li>
          <li>Envio de contribuições por escrito, quando previsto em edital.</li>
          <li>Participação presencial ou virtual, conforme cada evento.</li>
        </ul>
      </TransparenciaSection>
    </PageBase>
  );
}
