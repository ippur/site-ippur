"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import PageBase from "@/components/PageBase";

export default function NoticiaDetalhePage() {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarNoticia() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/noticias/${id}`);
        if (!res.ok) throw new Error("Erro ao carregar notícia");
        const data = await res.json();
        setNoticia(data);
      } catch (error) {
        console.error(error);
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

  return (
    <PageBase titulo={noticia.titulo} subtitulo={noticia.subtitulo}>
      <div className="max-w-3xl mx-auto p-4">
        {noticia.imagem && (
          <img
            src={noticia.imagem}
            alt={noticia.titulo}
            className="rounded-lg w-full mb-6"
          />
        )}

        <p className="text-justify leading-relaxed text-neutral-700 whitespace-pre-line">
          {noticia.conteudo}
        </p>

        <div className="text-center mt-8">
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
