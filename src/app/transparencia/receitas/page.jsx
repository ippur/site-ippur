import PageBase from "@/components/PageBase";
import CardDocumento from "@/components/CardDocumento";
import { fetchAPI } from "@/lib/api";

export const metadata = {
  title: "Receitas Públicas | IPPUR Redenção",
  description:
    "Acompanhe as informações de arrecadação e origem dos recursos que financiam as atividades do IPPUR.",
};

export default async function ReceitasPage() {
  const receitas = await fetchAPI("/transparencia?tipo=receita");

  return (
    <PageBase
      titulo="Receitas Públicas"
      subtitulo="Origem e arrecadação dos recursos do IPPUR, conforme a Lei Complementar nº 131/2009."
    >
      {receitas.length === 0 ? (
        <p className="text-center text-neutral-medium">
          Nenhuma informação de receita disponível no momento.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {receitas.map((r) => (
            <CardDocumento
              key={r.id}
              titulo={r.titulo}
              tipo={r.tipo}
              data={r.data}
              arquivo={r.arquivo}
            />
          ))}
        </div>
      )}
    </PageBase>
  );
}