"use client";

import PageBase from "@/components/PageBase";
import { useEffect, useState } from "react";

export default function ReurbPage() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/transparencia?tipo=REURB`)
      .then((res) => res.json())
      .then(setDocs)
      .catch(console.error);
  }, []);

  return (
    <PageBase
      titulo="REURB"
      subtitulo="Regularização Fundiária Urbana - documentos e editais."
    >
      <div className="space-y-4">
        {docs.length === 0 ? (
          <p>Nenhum documento disponível.</p>
        ) : (
          docs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white p-4 rounded-lg shadow-card"
            >
              <h3 className="font-semibold">{doc.titulo}</h3>
              <p className="text-sm text-gray-500">
                {new Date(doc.data).toLocaleDateString()}
              </p>

              {doc.arquivo && (
                <a
                  href={doc.arquivo}
                  target="_blank"
                  className="text-primary underline"
                >
                  Ver documento
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </PageBase>
  );
}