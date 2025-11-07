import PageBase from "@/components/PageBase";
import { fetchAPI } from "@/lib/api";

export const metadata = {
  title: "Relatórios e Auditorias | IPPUR Redenção",
  description:
    "Acompanhe relatórios de gestão, auditorias e documentos de transparência publicados pelo IPPUR.",
};

export default async function RelatoriosPage() {
  // 🔹 Busca dados reais do backend
  const documentos = await fetchAPI("/transparencia");

  return (
    <PageBase
      titulo="Relatórios e Auditorias"
      subtitulo="Relatórios de gestão, auditorias, balancetes e documentos de acompanhamento das atividades do IPPUR."
    >
      {documentos.length === 0 ? (
        <p className="text-center text-neutral-medium">
          Nenhum relatório ou documento disponível no momento.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documentos.map((doc) => (
            <div
              key={doc.id}
              className="bg-white border rounded-xl shadow-sm hover:shadow-md transition-all p-5"
            >
              <h3 className="text-lg font-semibold text-neutral-dark mb-1">
                {doc.titulo}
              </h3>
              <p className="text-sm text-neutral-medium mb-2">
                Tipo: <span className="font-medium">{doc.tipo}</span>
              </p>
              <p className="text-sm text-neutral-medium mb-3">
                Data: {new Date(doc.data).toLocaleDateString("pt-BR")}
              </p>

              {doc.arquivo && (
                <a
                  href={doc.arquivo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium hover:underline"
                >
                  📎 Ver documento
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </PageBase>
  );
}
