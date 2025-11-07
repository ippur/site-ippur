import PageBase from "@/components/PageBase";
import CardDocumento from "@/components/CardDocumento";
import { fetchAPI } from "@/lib/api";

export const metadata = {
  title: "Despesas e Pagamentos | IPPUR Redenção",
  description:
    "Acompanhe a execução das despesas e pagamentos realizados pelo IPPUR.",
};

export default async function DespesasPage() {
  const despesas = await fetchAPI("/transparencia?tipo=despesa");

  return (
    <PageBase
      titulo="Despesas e Pagamentos"
      subtitulo="Detalhamento das despesas e pagamentos executados pelo IPPUR, com favorecidos, valores e processos associados."
    >
      {despesas.length === 0 ? (
        <p className="text-center text-neutral-medium">
          Nenhuma despesa registrada no momento.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {despesas.map((d) => (
            <CardDocumento
              key={d.id}
              titulo={d.titulo}
              tipo={d.tipo}
              data={d.data}
              arquivo={d.arquivo}
            />
          ))}
        </div>
      )}
    </PageBase>
  );
}