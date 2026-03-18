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

      const filtrados = (data || []).filter(
        (doc) => (doc.tipo || "").toUpperCase() === "REURB"
      );

      setDocs(filtrados);
      setLoading(false);
    }

    carregar();
  }, []);

  const formatarData = (dataStr) => {
    if (!dataStr) return "-";
    return new Date(dataStr).toLocaleDateString("pt-BR");
  };

  return (
    <PageBase
      titulo="REURB"
      subtitulo="Regularização Fundiária Urbana - documentos e editais."
    >
      <TransparenciaSection
        titulo="Documentos REURB"
        descricao="Nesta seção são disponibilizados editais, notificações e documentos relacionados à Regularização Fundiária Urbana."
      >
        {loading ? (
          <p className="text-center text-gray-500">Carregando documentos...</p>
        ) : docs.length === 0 ? (
          <p className="text-center text-gray-500">
            Nenhum documento cadastrado no momento.
          </p>
        ) : (
          <ul className="divide-y divide-neutral-light">
            {docs.map((doc) => {
              const linkArquivo = doc.arquivo
                ? doc.arquivo.startsWith("http")
                  ? doc.arquivo
                  : `https://backend-site-eq0r.onrender.com${doc.arquivo}`
                : null;

              return (
                <li
                  key={doc.id}
                  className="py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                >
                  <div>
                    <p className="font-semibold text-primary-dark">
                      {doc.titulo}
                    </p>
                    <p className="text-xs text-neutral-dark">
                      {formatarData(doc.data)} • {doc.tipo || "REURB"}
                    </p>
                  </div>

                  <div>
                    {linkArquivo ? (
                      <a
                        href={linkArquivo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary font-medium hover:text-secondary-light underline underline-offset-2 text-sm"
                      >
                        Baixar PDF
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm">Sem arquivo</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </TransparenciaSection>
    </PageBase>
  );
}