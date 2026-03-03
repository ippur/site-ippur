"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PageBase from "@/components/PageBase";
import {
  listDocumentosTransparencia,
  createDocumentoTransparencia,
  deleteDocumentoTransparencia,
} from "@/lib/api";

const TIPOS = [
  "Receita",
  "Despesa",
  "Relatorio",
  "Contrato",
  "Licitacao",
  "Convenio",
  "Orcamento",
  "Auditoria",
  "Estrutura",
  "DadosAbertos",
  "AcessoInformacao",
  "Audiencia",
  "Outros",
];

function formatDateBR(value) {
  try {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString("pt-BR");
  } catch {
    return value;
  }
}

// Monta a URL do arquivo salvo (ex: "/uploads/arquivo.pdf")
function buildFileUrl(path) {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  // Seu BASE_URL no api.js termina em "/api".
  // Para abrir arquivos (/uploads), precisamos do host sem "/api".
  const raw =
    process.env.NEXT_PUBLIC_API_URL || "https://backend-site-eq0r.onrender.com/api";
  const base = raw.endsWith("/api") ? raw.slice(0, -4) : raw;

  return `${base}${path}`;
}

export default function AdminTransparenciaPage() {
  const router = useRouter();

  // auth
  const [token, setToken] = useState("");

  // form
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("Despesa");
  const [data, setData] = useState(""); // yyyy-mm-dd
  const [comentarios, setComentarios] = useState(""); // ✅ novo (opcional)
  const [arquivo, setArquivo] = useState(null);

  // list
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ui messages
  const [erro, setErro] = useState("");
  const [okMsg, setOkMsg] = useState("");

  // action states
  const [sending, setSending] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // filtros
  const [q, setQ] = useState("");
  const [fTipo, setFTipo] = useState("Todos");

  // 1) checa token ao entrar
  useEffect(() => {
    const t = localStorage.getItem("ippur_token");
    if (!t) {
      router.push("/admin/login");
      return;
    }
    setToken(t);
  }, [router]);

  async function carregarDocumentos(tkn = token) {
    setErro("");
    setOkMsg("");
    setLoading(true);
    try {
      const data = await listDocumentosTransparencia(tkn);
      setDocs(Array.isArray(data) ? data : []);
    } catch (e) {
      setErro(e.message || "Falha ao carregar documentos.");
      setDocs([]);
    } finally {
      setLoading(false);
    }
  }

  // 2) carrega lista quando token estiver disponível
  useEffect(() => {
    if (token) carregarDocumentos(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const docsFiltrados = useMemo(() => {
    const term = q.trim().toLowerCase();
    return docs
      .filter((d) => (fTipo === "Todos" ? true : (d.tipo || "") === fTipo))
      .filter((d) => {
        if (!term) return true;
        // ✅ inclui comentários na busca
        const text = `${d.titulo || ""} ${d.tipo || ""} ${d.comentarios || ""}`.toLowerCase();
        return text.includes(term);
      });
  }, [docs, q, fTipo]);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setOkMsg("");

    if (!titulo.trim()) return setErro("Informe o título.");
    if (!data) return setErro("Informe a data.");
    if (!arquivo) return setErro("Selecione um arquivo.");

    setSending(true);
    try {
      const fd = new FormData();
      fd.append("titulo", titulo.trim());
      fd.append("tipo", tipo);
      fd.append("data", data);
      // ✅ opcional de verdade: só manda se tiver texto
      if (comentarios?.trim()) fd.append("comentarios", comentarios.trim());
      fd.append("arquivo", arquivo); // bate com upload.single("arquivo")

      await createDocumentoTransparencia(fd, token);

      setOkMsg("Documento enviado com sucesso ✅");
      setTitulo("");
      setTipo("Despesa");
      setData("");
      setComentarios(""); // ✅ limpa comentários
      setArquivo(null);

      await carregarDocumentos(token);
    } catch (e2) {
      setErro(e2.message || "Erro ao enviar documento.");
    } finally {
      setSending(false);
    }
  }

  async function handleDelete(id) {
    const ok = window.confirm(
      "Tem certeza que deseja excluir este documento? Essa ação não pode ser desfeita."
    );
    if (!ok) return;

    setErro("");
    setOkMsg("");
    setDeletingId(id);
    try {
      await deleteDocumentoTransparencia(id, token);
      setOkMsg("Documento excluído ✅");
      setDocs((prev) => prev.filter((x) => x.id !== id));
    } catch (e) {
      setErro(e.message || "Erro ao excluir documento.");
    } finally {
      setDeletingId(null);
    }
  }

  function sair() {
    localStorage.removeItem("ippur_token");
    localStorage.removeItem("ippur_user");
    router.push("/admin/login");
  }

  return (
    <PageBase
      titulo="Painel de Transparência"
      subtitulo="Gerencie documentos publicados no Portal da Transparência."
    >
      <div className="flex justify-end mb-4">
        <button
          onClick={sair}
          className="text-sm font-semibold text-neutral-dark hover:underline"
        >
          Sair
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Upload */}
        <section className="lg:col-span-1 bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-neutral-dark mb-4">
            Enviar novo documento
          </h2>

          {erro ? (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {erro}
            </div>
          ) : null}

          {okMsg ? (
            <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
              {okMsg}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-neutral-dark mb-1">Título</label>
              <input
                className="w-full border rounded-lg p-2"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex.: Demonstrativo Financeiro – 1º Semestre"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-neutral-dark mb-1">Tipo</label>
                <select
                  className="w-full border rounded-lg p-2 bg-white"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                >
                  {TIPOS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-neutral-dark mb-1">Data</label>
                <input
                  type="date"
                  className="w-full border rounded-lg p-2 bg-white"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                />
              </div>
            </div>

            {/* ✅ Comentários (opcional) */}
            <div>
              <label className="block text-sm text-neutral-dark mb-1">
                Comentários (opcional)
              </label>
              <textarea
                className="w-full border rounded-lg p-2"
                value={comentarios}
                onChange={(e) => setComentarios(e.target.value)}
                placeholder="Resumo do conteúdo, contexto, período, observações..."
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm text-neutral-dark mb-1">Arquivo</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.zip,.rar,image/*"
                onChange={(e) => setArquivo(e.target.files?.[0] || null)}
              />
              <p className="text-xs text-neutral-dark/70 mt-2">
                Dica: PDF é o ideal. (Depois validamos tipo/tamanho no backend.)
              </p>
            </div>

            <button
              disabled={sending}
              className="w-full bg-primary text-white rounded-lg py-2 font-semibold hover:opacity-90 disabled:opacity-60"
            >
              {sending ? "Enviando..." : "Enviar"}
            </button>
          </form>
        </section>

        {/* Lista */}
        <section className="lg:col-span-2 bg-white border rounded-xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4">
            <div>
              <h2 className="text-lg font-semibold text-neutral-dark">
                Documentos publicados
              </h2>
              <p className="text-sm text-neutral-dark/70">
                Total: {docsFiltrados.length}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full md:w-auto">
              <input
                className="w-full border rounded-lg p-2"
                placeholder="Buscar por título..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              <select
                className="w-full border rounded-lg p-2 bg-white"
                value={fTipo}
                onChange={(e) => setFTipo(e.target.value)}
              >
                <option value="Todos">Todos os tipos</option>
                {TIPOS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 mb-4">
            <button
              onClick={() => carregarDocumentos(token)}
              className="border rounded-lg px-4 py-2 text-sm font-semibold hover:bg-neutral-50"
            >
              Recarregar
            </button>
          </div>

          {loading ? (
            <p className="text-neutral-dark/70">Carregando...</p>
          ) : docsFiltrados.length === 0 ? (
            <p className="text-neutral-dark/70">Nenhum documento cadastrado.</p>
          ) : (
            <div className="divide-y">
              {docsFiltrados.map((d) => {
                const fileUrl = buildFileUrl(d.arquivo);
                return (
                  <div
                    key={d.id}
                    className="py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                  >
                    <div>
                      <p className="font-semibold text-neutral-dark">{d.titulo}</p>
                      <p className="text-sm text-neutral-dark/70">
                        <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs mr-2">
                          {d.tipo || "—"}
                        </span>
                        <span className="text-xs">
                          {d.data ? formatDateBR(d.data) : "—"}
                        </span>
                      </p>

                      {/* ✅ Exibe comentários quando existir */}
                      {d.comentarios ? (
                        <p className="mt-1 text-sm text-neutral-dark/80 whitespace-pre-wrap">
                          {d.comentarios}
                        </p>
                      ) : null}
                    </div>

                    <div className="flex items-center gap-3">
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

                      <button
                        onClick={() => handleDelete(d.id)}
                        disabled={deletingId === d.id}
                        className="text-sm font-semibold text-red-600 hover:underline disabled:opacity-60"
                      >
                        {deletingId === d.id ? "Excluindo..." : "Excluir"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </PageBase>
  );
}