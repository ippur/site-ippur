import PageBase from "@/components/PageBase";
import { fetchAPI } from "@/lib/api";

export const metadata = {
  title: "Licitações e Contratos | IPPUR Redenção",
  description:
    "Acompanhe os processos licitatórios, contratos e aditivos firmados pelo IPPUR conforme a Lei da Transparência.",
};

export default async function LicitacoesPage() {
  // 🔹 Busca dados do backend
  const licitacoes = await fetchAPI("/licitacoes");

  return (
    <PageBase
      titulo="Licitações e Contratos"
      subtitulo="Acompanhe os processos licitatórios, contratos e aditivos firmados pelo IPPUR."
    >
      {licitacoes.length === 0 ? (
        <p className="text-center text-neutral-medium">
          Nenhuma licitação encontrada no momento.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {licitacoes.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-xl shadow-sm hover:shadow-md transition-all p-5"
            >
              <h3 className="text-lg font-semibold text-neutral-dark mb-1">
                {item.titulo}
              </h3>
              <p className="text-sm text-neutral-medium mb-2">
                Modalidade: <span className="font-medium">{item.modalidade}</span>
              </p>
              <p className="text-sm text-neutral-medium mb-2">
                Status: <span className="font-medium">{item.status}</span>
              </p>
              <p className="text-sm text-neutral-medium mb-3">
                Data: {new Date(item.data).toLocaleDateString("pt-BR")}
              </p>

              {item.arquivo && (
                <a
                  href={item.arquivo}
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
