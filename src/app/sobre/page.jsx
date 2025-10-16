"use client";
import PageBase from "@/components/PageBase";

export default function Sobre() {
  return (
    <PageBase
      titulo="Sobre o IPPUR"
      subtitulo="Instituto de Pesquisa, Planejamento Urbano e Desenvolvimento Sustentável de Redenção – PA."
    >
      <p className="text-neutral-dark leading-relaxed mb-6">
        O IPPUR é um órgão público municipal criado com o objetivo de promover o planejamento urbano e territorial de Redenção – PA. Atua no desenvolvimento de projetos voltados à mobilidade, habitação, meio ambiente e infraestrutura urbana.
      </p>

      <p className="text-neutral-dark leading-relaxed mb-6">
        Sua missão é promover o crescimento sustentável, garantindo qualidade de vida para os cidadãos e integrando as políticas públicas às necessidades reais da população.
      </p>

      <p className="text-neutral-dark leading-relaxed">
        O Instituto conta com equipes técnicas multidisciplinares que trabalham em parceria com secretarias, universidades e a sociedade civil, consolidando o papel do IPPUR como referência em planejamento urbano.
      </p>
    </PageBase>
  );
}
