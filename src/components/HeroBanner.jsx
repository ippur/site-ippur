export default function HeroBanner() {
  return (
    <section
      className="bg-cover bg-center text-white py-20"
      style={{ backgroundImage: "url('/banner.jpg')" }}
    >
      <div className="bg-black/50 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Bem-vindo ao IPPUR
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Transparência, planejamento e desenvolvimento sustentável para Redenção.
          </p>
          <a
            href="/sobre"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-medium"
          >
            Saiba mais
          </a>
        </div>
      </div>
    </section>
  );
}
