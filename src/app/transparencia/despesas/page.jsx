"use client";

import PageBase from "@/components/PageBase";
import TransparenciaSection from "@/components/TransparenciaSection";

export default function DespesasPage() {
  return (
    <PageBase
      titulo="Despesas e Pagamentos"
      subtitulo="Registro de gastos realizados pelo IPPUR."
    >
      <TransparenciaSection
        titulo="Despesas Orçamentárias"
        descricao="As despesas do IPPUR compreendem gastos com pessoal, contratos, serviços, materiais e investimentos."
      >
        <ul className="list-disc ml-6 text-neutral-dark space-y-2">
          <li>Despesas de custeio (manutenção das atividades).</li>
          <li>Despesas de capital (investimentos e obras).</li>
          <li>Contratos e serviços especializados.</li>
        </ul>
      </TransparenciaSection>

      <TransparenciaSection
        titulo="Transparência das Despesas"
        descricao="Os dados detalhados de despesas podem ser consultados nos relatórios oficiais e sistemas de transparência do município/estado."
      >
        <p className="text-neutral-dark">
          O IPPUR segue as normas de contabilidade pública e presta contas
          regularmente aos órgãos de controle, mantendo registros das despesas
          em relatórios e sistemas integrados de gestão.
        </p>
      </TransparenciaSection>
    </PageBase>
  );
}
