export default function SobreResumo() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 md:flex items-center gap-8">
        <img
          src="/sobre-ippur.jpg"
          alt="Imagem institucional do IPPUR"
          className="w-full md:w-1/2 rounded-lg shadow-md"
        />
        <div className="mt-6 md:mt-0 md:w-1/2">
          <h2 className="text-3xl font-semibold text-blue-700 mb-4">
            Sobre o IPPUR
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            O Instituto de Pesquisa, Planejamento Urbano e Desenvolvimento Sustentável
            de Redenção – IPPUR é o órgão responsável por coordenar ações de
            planejamento, urbanismo e políticas públicas voltadas ao crescimento
            sustentável da cidade.
          </p>
          <a
            href="/sobre"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Saiba mais
          </a>
        </div>
      </div>
    </section>
  );
}
