"use client";

import { useEffect, useState } from "react";
import PageBase from "@/components/PageBase";

const API =
  process.env.NEXT_PUBLIC_API_URL || "https://backend-site-eq0r.onrender.com";

function formatDateBR(value) {
  try {
    if (!value) return "";
    const str = typeof value === "string" ? value : String(value);
    const d = new Date(str.slice(0, 10) + "T12:00:00");
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString("pt-BR");
  } catch {
    return value;
  }
}

function buildFileUrl(filePath) {
  if (!filePath) return null;

  if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
    return filePath;
  }

  return `${API}${filePath}`;
}

export default function LicitacoesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API}/api/transparencia?tipo=licitacao`, {
          cache: "no-store",
        });

        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erro ao carregar licitações:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <PageBase
      titulo="Licitações"
      subtitulo="Consulte editais, resultados e documentos oficiais publicados pelo IPPUR."
    >
      <section className="bg-white border rounded-xl p-6 shadow-sm">
        {loading ? (
          <p className="text-neutral-dark/70">Carregando licitações...</p>
        ) : items.length === 0 ? (
          <p className="text-neutral-dark/70">Nenhuma licitação cadastrada.</p>
        ) : (
          <div className="divide-y">
            {items.map((item) => {
              const fileUrl = buildFileUrl(item.arquivo);

              return (
                <div
                  key={item.id}
                  className="py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                >
                  <div>
                    <p className="font-semibold text-neutral-dark">{item.titulo}</p>

                    <p className="text-sm text-neutral-dark/70">
                      <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs mr-2">
                        {item.modalidade || "—"}
                      </span>

                      <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs mr-2">
                        {item.status || "—"}
                      </span>

                      <span className="text-xs">
                        {item.data ? formatDateBR(item.data) : "—"}
                      </span>
                    </p>

                    {item.comentarios ? (
                      <p className="mt-1 text-sm text-neutral-dark/80 whitespace-pre-wrap">
                        {item.comentarios}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    {fileUrl ? (
                      <a
                        href={fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-semibold text-secondary hover:underline"
                      >
                        Abrir
                      </a>
                    ) : (
                      <span className="text-sm text-neutral-dark/60">Sem arquivo</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </PageBase>
  );
}