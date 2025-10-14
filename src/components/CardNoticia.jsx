export default function CardNoticia({ noticia }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
      <img
        src={noticia.imagem}
        alt={noticia.titulo}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          {noticia.titulo}
        </h3>
        <p className="text-gray-600 text-sm mb-4">{noticia.resumo}</p>
        <a
          href={`/noticias/${noticia.id}`}
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          Ler mais →
        </a>
      </div>
    </div>
  );
}
