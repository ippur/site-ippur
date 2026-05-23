"use client";

import { useEffect, useState } from "react";
import HeroBanner from "../components/HeroBanner";
import QuickLinks from "../components/QuickLinks";
import SobreResumo from "../components/SobreResumo";
import TransparenciaSection from "../components/TransparenciaSection";
import CardNoticia from "../components/CardNoticia";
import { fetchNoticias } from "../services/api";

export default function Home() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarNoticias() {
      try {
        const data = await fetchNoticias();
        setNoticias(Array.isArray(data) ? data.slice(0, 3) : []);
      } catch (error) {
        console.error("Erro ao carregar notícias:", error);
        setNoticias([]);
      } finally {
        setLoading(false);
      }
    }

    carregarNoticias();
  }, []);

  return (
    <>
      <HeroBanner />

      <QuickLinks />

      <SobreResumo />

      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-dark mb-12 text-center">
          Últimas Notícias
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Carregando notícias...</p>
        ) : noticias.length === 0 ? (
          <p className="text-center text-gray-500">Nenhuma notícia disponível.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {noticias.map((n) => (
              <CardNoticia key={n.id} noticia={n} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}