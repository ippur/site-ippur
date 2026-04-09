"use client";

import PageBase from "@/components/PageBase";

export default function OrcamentoPage() {
  return (
    <PageBase
      titulo="Planejamento e Orçamento"
      subtitulo="Informações sobre planejamento orçamentário, incluindo PPA, LDO e LOA."
    >
      <section className="bg-white border rounded-xl p-6 shadow-sm space-y-6">
        
        {/* BLOCO 1 */}
        <div>
          <h2 className="text-lg font-semibold text-primary mb-2">
            Planejamento Orçamentário
          </h2>
          <p className="text-neutral-dark/80 leading-relaxed">
            O planejamento orçamentário do IPPUR é estruturado com base nos
            instrumentos legais que orientam a gestão pública, garantindo
            transparência, responsabilidade fiscal e eficiência na aplicação
            dos recursos públicos.
          </p>
        </div>

        {/* BLOCO 2 */}
        <div>
          <h2 className="text-lg font-semibold text-primary mb-2">
            Instrumentos de Planejamento
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-neutral-dark/80">
            <li>
              <strong>PPA (Plano Plurianual):</strong> define as diretrizes,
              objetivos e metas da administração pública para um período de
              quatro anos.
            </li>
            <li>
              <strong>LDO (Lei de Diretrizes Orçamentárias):</strong> estabelece
              as prioridades e orienta a elaboração do orçamento anual.
            </li>
            <li>
              <strong>LOA (Lei Orçamentária Anual):</strong> estima as receitas e
              fixa as despesas para o exercício financeiro.
            </li>
          </ul>
        </div>

        {/* BLOCO 3 */}
        <div>
          <h2 className="text-lg font-semibold text-primary mb-2">
            Transparência e Acesso à Informação
          </h2>
          <p className="text-neutral-dark/80 leading-relaxed">
            Os dados relacionados ao orçamento público são divulgados conforme
            as normas de transparência vigentes, permitindo que qualquer cidadão
            acompanhe a aplicação dos recursos e a execução das políticas
            públicas.
          </p>
          <p className="mt-2 text-neutral-dark/80 leading-relaxed">
            As informações detalhadas podem ser consultadas nos sistemas oficiais
            do município e demais portais de transparência vinculados à gestão
            pública.
          </p>
        </div>

      </section>
    </PageBase>
  );
}