"use client";

import { useEffect, useState } from "react";
import PageBase from "@/components/PageBase";
import CardNoticia from "@/components/CardNoticia";

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarNoticias() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/noticias`);
        if (!res.ok) throw new Error("Erro ao buscar notícias");
        const data = await res.json();
        setNoticias(data);
      } catch (error) {
        console.error("Erro ao carregar notícias:", error);
      } finally {
        setCarregando(false);
      }
    }

    carregarNoticias();
  }, []);

  return (
    <PageBase
      titulo="Notícias"
      subtitulo="Acompanhe as últimas ações e projetos do IPPUR."
    >
      {carregando ? (
        <p className="text-center text-neutral-medium">Carregando notícias...</p>
      ) : noticias.length === 0 ? (
        <p className="text-center text-neutral-medium">
          Nenhuma notícia encontrada.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {noticias.map((n) => (
            <CardNoticia key={n.id} noticia={n} />
          ))}
        </div>
      )}
    </PageBase>
  );
}
