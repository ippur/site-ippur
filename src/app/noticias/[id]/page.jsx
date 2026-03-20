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
  const [imagemAtivaIndex, setImagemAtivaIndex] = useState(null);

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

  const galeria = Array.isArray(noticia?.galeria) ? noticia.galeria : [];
  const imagemAtiva =
    imagemAtivaIndex !== null && galeria[imagemAtivaIndex]
      ? galeria[imagemAtivaIndex]
      : null;

  function abrirImagem(index) {
    setImagemAtivaIndex(index);
  }

  function fecharImagem() {
    setImagemAtivaIndex(null);
  }

  function imagemAnterior() {
    if (!galeria.length) return;
    setImagemAtivaIndex((prev) =>
      prev === 0 ? galeria.length - 1 : prev - 1
    );
  }

  function proximaImagem() {
    if (!galeria.length) return;
    setImagemAtivaIndex((prev) =>
      prev === galeria.length - 1 ? 0 : prev + 1
    );
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (imagemAtivaIndex === null) return;

      if (e.key === "Escape") {
        fecharImagem();
      } else if (e.key === "ArrowLeft") {
        imagemAnterior();
      } else if (e.key === "ArrowRight") {
        proximaImagem();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [imagemAtivaIndex, galeria.length]);

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
              {galeria.map((img, index) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => abrirImagem(index)}
                  className="block bg-white border border-neutral-light rounded-xl overflow-hidden shadow-card hover:shadow-smooth transition-all duration-300 hover:scale-[1.01] text-left"
                >
                  <img
                    src={img.url}
                    alt={`Imagem da galeria - ${noticia.titulo}`}
                    className="w-full h-52 object-cover"
                  />
                </button>
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

      {imagemAtiva && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center px-4 py-6"
          onClick={fecharImagem}
        >
          <div
            className="relative max-w-6xl w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={fecharImagem}
              className="absolute top-2 right-2 md:top-4 md:right-4 z-10 bg-white/90 hover:bg-white text-neutral-900 rounded-full w-10 h-10 text-xl font-bold shadow"
              aria-label="Fechar imagem"
            >
              ×
            </button>

            {galeria.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={imagemAnterior}
                  className="absolute left-2 md:left-4 z-10 bg-white/90 hover:bg-white text-neutral-900 rounded-full w-10 h-10 text-xl font-bold shadow"
                  aria-label="Imagem anterior"
                >
                  ‹
                </button>

                <button
                  type="button"
                  onClick={proximaImagem}
                  className="absolute right-2 md:right-4 z-10 bg-white/90 hover:bg-white text-neutral-900 rounded-full w-10 h-10 text-xl font-bold shadow"
                  aria-label="Próxima imagem"
                >
                  ›
                </button>
              </>
            )}

            <div className="w-full flex flex-col items-center">
              <img
                src={imagemAtiva.url}
                alt={`Imagem ampliada - ${noticia.titulo}`}
                className="max-h-[80vh] w-auto max-w-full rounded-xl shadow-2xl object-contain"
              />

              {galeria.length > 1 && (
                <p className="text-white text-sm mt-4">
                  {imagemAtivaIndex + 1} de {galeria.length}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </PageBase>
  );
}