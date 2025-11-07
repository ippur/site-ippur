// src/components/CardDocumento.jsx
"use client";

export default function CardDocumento({ titulo, tipo, data, arquivo }) {
  return (
    <div className="bg-white border rounded-xl shadow-sm hover:shadow-md transition-all p-5">
      <h3 className="text-lg font-semibold text-neutral-dark mb-1">{titulo}</h3>

      {tipo && (
        <p className="text-sm text-neutral-medium mb-2">
          Tipo: <span className="font-medium">{tipo}</span>
        </p>
      )}

      {data && (
        <p className="text-sm text-neutral-medium mb-3">
          Data: {new Date(data).toLocaleDateString("pt-BR")}
        </p>
      )}

      {arquivo ? (
        <a
          href={arquivo}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-medium hover:underline"
        >
          📎 Ver documento
        </a>
      ) : (
        <p className="text-sm text-neutral-medium italic">Sem arquivo disponível</p>
      )}
    </div>
  );
}