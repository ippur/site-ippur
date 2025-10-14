export default function QuickLinks() {
  const links = [
    { nome: "Transparência", icone: "📊", url: "/transparencia", cor: "bg-blue-100" },
    { nome: "Licitações", icone: "📑", url: "/licitacoes", cor: "bg-yellow-100" },
    { nome: "Notícias", icone: "📰", url: "/noticias", cor: "bg-green-100" },
    { nome: "Contatos", icone: "☎️", url: "/contatos", cor: "bg-purple-100" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold text-blue-700 mb-8 text-center">
        Acesso Rápido
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {links.map((item) => (
          <a
            key={item.nome}
            href={item.url}
            className={`${item.cor} rounded-xl shadow-md hover:shadow-lg p-6 flex flex-col items-center justify-center text-center transition`}
          >
            <div className="text-4xl mb-2">{item.icone}</div>
            <span className="text-blue-800 font-medium">{item.nome}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
