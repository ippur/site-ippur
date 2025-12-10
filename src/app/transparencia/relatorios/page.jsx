"use client";

import { useEffect, useState } from "react";
import PageBase from "@/components/PageBase";
import TransparenciaSection from "@/components/TransparenciaSection";
import { fetchTransparencia } from "@/services/api";

export default function RelatoriosPage() {
  const [relatorios, setRelatorios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      const data = await fetchTransparencia();
      // Filtra somente documentos cujo tipo contenha "relat"
      const filtrados = (data || []).filter((doc) =>
        (doc.tipo || "").toLowerCase().includes("relat")
      );
      setRelatorios(filtrados);
      setLoading(false);
    }
    carregar();
  }, []);

  const formatarData = (dataStr) => {
    if (!dataStr) return "-";
    const d = new Date(dataStr);
    return d.toLocaleDateString("pt-BR");
  };

  return (
    <PageBase
      titulo="Relatórios e Auditorias"
      subtitulo="Publicação de relatórios técnicos, de gestão e auditorias relacionadas ao IPPUR."
    >
      <TransparenciaSection
        titulo="Relatórios Publicados"
        descricao="Nesta seção são disponibilizados relatórios de atividades, gestão, auditorias e outros documentos de acompanhamento."
      >
        {loading ? (
          <p className="text-center text-gray-500">Carregando relatórios...</p>
        ) : relatorios.length === 0 ? (
          <p className="text-center text-gray-500">
            Nenhum relatório cadastrado no momento.
          </p>
        ) : (
          <ul className="divide-y divide-neutral-light">
            {relatorios.map((doc) => {
              const linkArquivo = doc.arquivo
                ? doc.arquivo.startsWith("http")
                  ? doc.arquivo
                  : `https://backend-site-eq0r.onrender.com${doc.arquivo}`
                : null;

              return (
                <li key={doc.id} className="py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <p className="font-semibold text-primary-dark">
                      {doc.titulo}
                    </p>
                    <p className="text-xs text-neutral-dark">
                      {formatarData(doc.data)} • {doc.tipo || "Relatório"}
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
