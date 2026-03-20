"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import PageBase from "@/components/PageBase";
import { fetchNoticia } from "@/services/api";

export default function NoticiaDetalhePage() {
  const params = useParams();
  const id = params?.id;

  const [noticia, setNoticia] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarNoticia() {
      try {
        if (!id) return;

        const data = await fetchNoticia(id);
        setNoticia(data);
      } catch (error) {
        console.error("Erro ao carregar notícia:", error);
        setNoticia(null);
      } finally {
        setCarregando(false);
      }
    }

    carregarNoticia();
  }, [id]);

  if (carregando) {
    return (
      <PageBase titulo="Notícia" subtitulo="Carregando conteúdo...">
        <p className="text-center text-neutral-medium">Carregando...</p>
      </PageBase>
    );
  }

  if (!noticia) {
    return (
      <PageBase titulo="Notícia" subtitulo="">
        <p className="text-center text-neutral-medium mb-6">
          Notícia não encontrada.
        </p>

        <div className="text-center">
          <Link
            href="/noticias"
            className="text-primary hover:underline font-medium"
          >
            ← Voltar às notícias
          </Link>
        </div>
      </PageBase>
    );
  }

  const galeria = Array.isArray(noticia.galeria) ? noticia.galeria : [];

  return (
    <PageBase
      titulo={noticia.titulo}
      subtitulo={noticia.resumo || "Acompanhe os detalhes desta notícia."}
    >
      <div className="max-w-4xl mx-auto px-4 py-2">
        {noticia.imagem && (
          <img
            src={noticia.imagem}
            alt={noticia.titulo}
            className="rounded-lg w-full mb-6"
          />
        )}

        <div className="text-sm text-neutral-dark mb-6">
          {noticia.criadoEm
            ? new Date(noticia.criadoEm).toLocaleDateString("pt-BR")
            : ""}
        </div>

        <div
          className="prose max-w-none text-neutral-700"
          dangerouslySetInnerHTML={{
            __html: noticia.conteudo || "<p>Sem conteúdo disponível.</p>",
          }}
        />

        {galeria.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-primary-dark mb-4">
              Galeria de Imagens
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {galeria.map((img) => (
                <a
                  key={img.id}
                  href={img.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white border border-neutral-light rounded-xl overflow-hidden shadow-card hover:shadow-smooth transition-all duration-300 hover:scale-[1.01]"
                >
                  <img
                    src={img.url}
                    alt={`Imagem da galeria - ${noticia.titulo}`}
                    className="w-full h-52 object-cover"
                  />
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            href="/noticias"
            className="text-primary hover:underline font-medium"
          >
            ← Voltar às notícias
          </Link>
        </div>
      </div>
    </PageBase>
  );
}