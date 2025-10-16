"use client";
import PageBase from "@/components/PageBase";
import CardNoticia from "@/components/CardNoticia";

export default function Noticias() {
  const noticias = [
    {
      id: 1,
      titulo: "Audiência Pública sobre Plano Diretor",
      resumo: "IPPUR convida a população para contribuir nas diretrizes do novo Plano Diretor de Redenção.",
      imagem: "/noticia1.jpg",
    },
    {
      id: 2,
      titulo: "Projeto de Mobilidade Urbana é iniciado",
      resumo: "Obras de revitalização de vias e calçadas promovem mais acessibilidade e fluidez no trânsito.",
      imagem: "/noticia2.jpg",
    },
  ];

  return (
    <PageBase titulo="Notícias" subtitulo="Acompanhe as últimas ações e projetos do IPPUR.">
      <div className="grid md:grid-cols-2 gap-8">
        {noticias.map((n) => (
          <CardNoticia key={n.id} noticia={n} />
        ))}
      </div>
    </PageBase>
  );
}
