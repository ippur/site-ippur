export default function ManutencaoPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-primary px-6">
      <div className="max-w-xl text-center text-white">
        <img
          src="/logo.png"
          alt="IPPUR"
          className="h-24 mx-auto mb-6 opacity-95"
        />

        <h1 className="text-3xl font-serif font-semibold mb-4">
          Site em Manutenção
        </h1>

        <p className="text-lg text-gray-100 mb-6">
          O site do Instituto de Pesquisa, Planejamento Urbano e Desenvolvimento
          Sustentável de Redenção está passando por atualizações.
        </p>

        <p className="text-sm text-gray-200">
          Em breve estaremos de volta com mais transparência, informações e
          serviços para a população.
        </p>

        <div className="mt-8 text-xs text-gray-300">
          IPPUR · Redenção – PA
        </div>
      </div>
    </main>
  );
}
