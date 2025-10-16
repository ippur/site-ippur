"use client";
import PageBase from "@/components/PageBase";

export default function Licitacoes() {
  const licitacoes = [
    { id: 1, titulo: "Construção de Praça Pública no Setor Novo Horizonte", status: "Aberta", data: "15/10/2025" },
    { id: 2, titulo: "Aquisição de Materiais de Escritório", status: "Encerrada", data: "02/09/2025" },
  ];

  return (
    <PageBase
      titulo="Licitações"
      subtitulo="Editais, avisos e resultados de processos licitatórios."
    >
      <div className="overflow-x-auto">
        <table className="min-w-full border border-neutral-medium rounded-lg">
          <thead>
            <tr className="bg-primary text-white text-left">
              <th className="py-3 px-4">Título</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Data</th>
            </tr>
          </thead>
          <tbody>
            {licitacoes.map((l) => (
              <tr key={l.id} className="border-t border-neutral-medium hover:bg-neutral-light transition">
                <td className="py-3 px-4">{l.titulo}</td>
                <td
                  className={`py-3 px-4 font-semibold ${
                    l.status === "Aberta" ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {l.status}
                </td>
                <td className="py-3 px-4">{l.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageBase>
  );
}
