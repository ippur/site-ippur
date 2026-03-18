"use client";

import { useEffect, useState } from "react";
import PageBase from "@/components/PageBase";
import TransparenciaSection from "@/components/TransparenciaSection";
import { fetchTransparencia } from "@/services/api";

export default function ReurbPage() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function carregar() {
    const data = await fetchTransparencia();

    const filtrados = (data || []).filter((doc) =>
      (doc.tipo || "").toUpperCase() === "REURB"
    );

    setDocs(filtrados);
    setLoading(false);
  }

  carregar();
}, []);

    carregarDocs();
  }, []);

  return (
    <PageBase
      titulo="REURB"
      subtitulo="Regularização Fundiária Urbana - documentos e editais."
    >
      {loading ? (
        <p className="text-center text-gray-500">Carregando documentos...</p>
      ) : docs.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum documento disponível.</p>
      ) : (
        <div className="space-y-4">
          {docs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white border border-neutral-light rounded-xl shadow-card p-6"
            >
              <h3 className="text-lg font-semibold text-primary-dark mb-2">
                {doc.titulo}
              </h3>

              <p className="text-sm text-gray-500 mb-2">
                {new Date(doc.data).toLocaleDateString("pt-BR")}
              </p>

              {doc.comentarios && (
                <p className="text-neutral-dark mb-4">{doc.comentarios}</p>
              )}

              {doc.arquivo && (
                <a
                  href={doc.arquivo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-primary font-medium hover:underline"
                >
                  Ver documento
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </PageBase>
  );
}