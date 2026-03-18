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

  return (
    <PageBase
      titulo={noticia.titulo}
      subtitulo={noticia.resumo || "Acompanhe os detalhes desta notícia."}
    >
      <div className="max-w-3xl mx-auto px-4 py-2">
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