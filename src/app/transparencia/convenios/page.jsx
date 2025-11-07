import PageBase from "@/components/PageBase";
import CardDocumento from "@/components/CardDocumento";
import { fetchAPI } from "@/lib/api";

export const metadata = {
  title: "Convênios e Parcerias | IPPUR Redenção",
  description:
    "Informações sobre acordos, termos de fomento e parcerias firmadas pelo IPPUR.",
};

export default async function ConveniosPage() {
  const convenios = await fetchAPI("/transparencia?tipo=convenio");

  return (
    <PageBase
      titulo="Convênios e Parcerias"
      subtitulo="Acordos, termos de fomento e parcerias realizadas pelo IPPUR com outras instituições públicas e privadas."
    >
      {convenios.length === 0 ? (
        <p className="text-center text-neutral-medium">
          Nenhum convênio ou parceria registrado no momento.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {convenios.map((c) => (
            <CardDocumento
              key={c.id}
              titulo={c.titulo}
              tipo={c.tipo}
              data={c.data}
              arquivo={c.arquivo}
            />
          ))}
        </div>
      )}
    </PageBase>
  );
}
