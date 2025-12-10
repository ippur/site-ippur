"use client";

import PageBase from "@/components/PageBase";
import TransparenciaSection from "@/components/TransparenciaSection";

export default function AcessoInformacao() {
  return (
    <PageBase
      titulo="Acesso à Informação"
      subtitulo="Informações institucionais conforme a Lei nº 12.527/2011 (LAI)."
    >
      <TransparenciaSection
        titulo="Direito de Acesso"
        descricao="Qualquer cidadão pode solicitar informações ao IPPUR, sem necessidade de justificar o pedido."
      >
        <ul className="list-disc ml-6 text-neutral-dark space-y-2">
          <li>Prazo padrão de resposta: até 20 dias, prorrogáveis por mais 10.</li>
          <li>Pedidos podem ser feitos presencialmente ou por canais eletrônicos.</li>
          <li>Caso o pedido seja negado, o cidadão tem direito a recurso.</li>
        </ul>
      </TransparenciaSection>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <TransparenciaSection
          titulo="Canais para Solicitação"
          descricao="Formas oficiais de solicitar informações ao IPPUR."
        >
          <ul className="list-disc ml-6 text-neutral-dark space-y-2">
            <li>Atendimento presencial na sede do IPPUR.</li>
            <li>Canal eletrônico oficial (e-SIC) – quando implementado.</li>
            <li>E-mail institucional para dúvidas gerais.</li>
          </ul>
        </TransparenciaSection>

        <TransparenciaSection
          titulo="Transparência Ativa"
          descricao="Informações que o IPPUR disponibiliza de forma espontânea, sem necessidade de solicitação."
        >
          <ul className="list-disc ml-6 text-neutral-dark space-y-2">
            <li>Estrutura organizacional e contatos.</li>
            <li>Relatórios de atividades e projetos.</li>
            <li>Dados orçamentários e financeiros.</li>
          </ul>
        </TransparenciaSection>
      </div>
    </PageBase>
  );
}
