"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PageBase from "@/components/PageBase";
import {
  fetchAPI,
  createDocumentoTransparencia,
  deleteDocumentoTransparencia,
} from "@/lib/api";

export default function AdminTransparenciaPage() {
  const router = useRouter();

  const [token, setToken] = useState(null);
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  // form
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("relatorio");
  const [data, setData] = useState("");
  const [arquivo, setArquivo] = useState(null);
  const [msg, setMsg] = useState("");

  const tipos = useMemo(
    () => [
      { value: "receita", label: "Receita" },
      { value: "despesa", label: "Despesa" },
      { value: "convenio", label: "Convênio" },
      { value: "relatorio", label: "Relatório/Auditoria" },
    ],
    []
  );

  async function carregar() {
    setLoading(true);
    const data = await fetchAPI("/transparencia");
    setDocs(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    const t = localStorage.getItem("ippur_token");
    if (!t) {
      router.push("/admin/login");
      return;
    }
    setToken(t);
    carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function logout() {
    localStorage.removeItem("ippur_token");
    localStorage.removeItem("ippur_user");
    router.push("/admin/login");
  }

  async function handleUpload(e) {
    e.preventDefault();
    setMsg("");

    if (!arquivo) {
      setMsg("Selecione um arquivo para enviar.");
      return;
    }

    try {
      const fd = new FormData();
      fd.append("titulo", titulo);
      fd.append("tipo", tipo);
      fd.append("data", data);
      fd.append("arquivo", arquivo);

      await createDocumentoTransparencia(fd, token);

      setTitulo("");
      setTipo("relatorio");
      setData("");
      setArquivo(null);
      setMsg("Documento enviado com sucesso ✅");

      await carregar();
    } catch (err) {
      setMsg("Falha ao enviar. Verifique login/permissão/token.");
    }
  }

  async function handleDelete(id) {
    const ok = confirm("Excluir este documento?");
    if (!ok) return;

    try {
      await deleteDocumentoTransparencia(id, token);
      await carregar();
    } catch (e) {
      alert("Falha ao excluir.");
    }
  }

  return (
    <PageBase
      titulo="Gerenciar Transparência"
      subtitulo="Envio e manutenção de documentos do portal"
    >
      <div className="flex items-center justify-end mb-4">
        <button onClick={logout} className="text-sm text-primary hover:underline">
          Sair
        </button>
      </div>

      {/* Upload */}
      <div className="bg-white border rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-lg font-semibold text-neutral-dark mb-4">
          Enviar novo documento
        </h2>

        <form onSubmit={handleUpload} className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Título</label>
            <input
              className="w-full border rounded-lg p-2"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Tipo</label>
            <select
              className="w-full border rounded-lg p-2"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              {tipos.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Data</label>
            <input
              className="w-full border rounded-lg p-2"
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Arquivo</label>
            <input
              className="w-full"
              type="file"
              onChange={(e) => setArquivo(e.target.files?.[0] || null)}
              required
            />
            <p className="text-xs text-neutral-medium mt-1">
              Dica: PDF é o ideal. (Depois a gente valida tipo/tamanho no backend.)
            </p>
          </div>

          {msg && <p className="md:col-span-2 text-sm text-neutral-medium">{msg}</p>}

          <div className="md:col-span-2">
            <button className="bg-primary text-white rounded-lg py-2 px-4 font-semibold hover:opacity-90">
              Enviar
            </button>
          </div>
        </form>
      </div>

      {/* Lista */}
      <div>
        <h2 className="text-lg font-semibold text-neutral-dark mb-4">
          Documentos publicados
        </h2>

        {loading ? (
          <p className="text-neutral-medium">Carregando...</p>
        ) : docs.length === 0 ? (
          <p className="text-neutral-medium">Nenhum documento cadastrado.</p>
        ) : (
          <div className="space-y-3">
            {docs.map((d) => (
              <div
                key={d.id}
                className="bg-white border rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
              >
                <div>
                  <p className="font-semibold text-neutral-dark">{d.titulo}</p>
                  <p className="text-sm text-neutral-medium">
                    Tipo: {d.tipo} | Data:{" "}
                    {d.data ? new Date(d.data).toLocaleDateString("pt-BR") : "-"}
                  </p>
                  {d.arquivo && (
                    <a
                      href={d.arquivo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      📎 Abrir arquivo
                    </a>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(d.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Excluir
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageBase>
  );
}
