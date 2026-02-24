"use client";

import { useEffect, useState } from "react";
import PageBase from "@/components/PageBase";
import { fetchLicitacoes } from "@/services/api";

export default function Licitacoes() {
  const [licitacoes, setLicitacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      const data = await fetchLicitacoes();
      setLicitacoes(data);
      setLoading(false);
    }
    carregar();
  }, []);

  const formatarData = (dataStr) => {
    if (!dataStr) return "-";
    const d = new Date(dataStr);
    return d.toLocaleDateString("pt-BR");
  };

  const getStatusClass = (status) => {
    const s = (status || "").toLowerCase();
    if (s.includes("abert")) return "text-green-700 bg-green-100";
    if (s.includes("encerr")) return "text-gray-700 bg-gray-100";
    if (s.includes("andamento")) return "text-blue-700 bg-blue-100";
    return "text-primary bg-neutral-light";
  };

  return (
    <PageBase
      titulo="Licitações"
      subtitulo="Editais, avisos e resultados de processos licitatórios."
    >
      {loading ? (
        <p className="text-center text-gray-500">Carregando licitações...</p>
      ) : licitacoes.length === 0 ? (
        <p className="text-center text-gray-500">
          Nenhuma licitação cadastrada no momento.
        </p>
      ) : (
        <div className="overflow-x-auto border border-neutral-medium rounded-xl shadow-card bg-white">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-primary text-white text-left">
                <th className="py-3 px-4">Título</th>
                <th className="py-3 px-4">Modalidade</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Data</th>
                <th className="py-3 px-4">Documento</th>
              </tr>
            </thead>
            <tbody>
              {licitacoes.map((l) => {
                const linkArquivo = l.arquivo
                  ? l.arquivo.startsWith("http")
                    ? l.arquivo
                    : `https://backend-site-eq0r.onrender.com${l.arquivo}`
                  : null;

                return (
                  <tr
                    key={l.id}
                    className="border-t border-neutral-medium hover:bg-neutral-light transition"
                  >
                    <td className="py-3 px-4">{l.titulo}</td>
                    <td className="py-3 px-4">{l.modalidade || "-"}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                          l.status
                        )}`}
                      >
                        {l.status || "—"}
                      </span>
                    </td>
                    <td className="py-3 px-4">{formatarData(l.data)}</td>
                    <td className="py-3 px-4">
                      {linkArquivo ? (
                        <a
                          href={linkArquivo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-secondary font-medium hover:text-secondary-light underline underline-offset-2"
                        >
                          Baixar edital
                        </a>
                      ) : (
                        <span className="text-gray-400">Sem arquivo</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </PageBase>
  );
}
