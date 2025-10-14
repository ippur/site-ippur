import HeroBanner from "../components/HeroBanner";
import QuickLinks from "../components/QuickLinks";
import SobreResumo from "../components/SobreResumo";
import CardNoticia from "../components/CardNoticia";

export default function Home() {
  const noticias = [
    {
      id: 1,
      titulo: "Novo projeto de urbanização iniciado",
      resumo: "IPPUR inicia novo projeto de urbanização sustentável no bairro Novo Horizonte.",
      imagem: "/noticia1.jpg",
    },
    {
      id: 2,
      titulo: "Audiência pública sobre planejamento urbano",
      resumo: "População é convidada a participar das discussões sobre o plano diretor da cidade.",
      imagem: "/noticia2.jpg",
    },
  ];

  return (
    <>
      <HeroBanner />
      <QuickLinks />
      <SobreResumo />
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
          Últimas Notícias
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {noticias.map((n) => (
            <CardNoticia key={n.id} noticia={n} />
          ))}
        </div>
      </section>
    </>
  );
}
