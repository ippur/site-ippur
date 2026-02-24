"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PageBase from "@/components/PageBase";
import { getNoticiaById, updateNoticia } from "@/lib/api";

export default function AdminEditarNoticiaPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const token = useMemo(() => (typeof window === "undefined" ? "" : localStorage.getItem("ippur_token") || ""), []);

  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  const [titulo, setTitulo] = useState("");
  const [resumo, setResumo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [imagemAtual, setImagemAtual] = useState("");
  const [novaImagem, setNovaImagem] = useState(null);

  useEffect(() => {
    if (!token) {
      router.push("/admin/login");
      return;
    }

    async function carregar() {
      setErro("");
      setLoading(true);
      try {
        const data = await getNoticiaById(id);
        setTitulo(data?.titulo || "");
        setResumo(data?.resumo || "");
        setConteudo(data?.conteudo || "");
        setImagemAtual(data?.imagem || "");
      } catch (e) {
        setErro(e?.message || "Erro ao carregar notícia.");
      } finally {
        setLoading(false);
      }
    }

    if (id) carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!token) return;

    setErro("");
    setSalvando(true);
    try {
      const fd = new FormData();
      fd.append("titulo", titulo);
      fd.append("resumo", resumo);
      fd.append("conteudo", conteudo);
      if (novaImagem) fd.append("imagem", novaImagem);

      await updateNoticia(id, fd, token);
      router.push("/admin/noticias");
    } catch (e) {
      setErro(e?.message || "Falha ao atualizar notícia.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <PageBase titulo="Admin • Editar Notícia" subtitulo="Atualize o conteúdo publicado">
      <div className="max-w-3xl mx-auto bg-white border rounded-xl p-6 shadow-sm">
        {loading ? (
          <p className="text-sm text-neutral-dark/70">Carregando...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-neutral-dark mb-1">Título</label>
              <input className="w-full border rounded-lg p-2" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
            </div>

            <div>
              <label className="block text-sm text-neutral-dark mb-1">Resumo</label>
              <textarea
                className="w-full border rounded-lg p-2 min-h-[90px]"
                value={resumo}
                onChange={(e) => setResumo(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-neutral-dark mb-1">Conteúdo (HTML)</label>
              <textarea
                className="w-full border rounded-lg p-2 min-h-[180px]"
                value={conteudo}
                onChange={(e) => setConteudo(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm text-neutral-dark mb-1">Imagem</label>

              {imagemAtual ? (
                <p className="text-xs text-neutral-dark/70 mb-2">
                  Imagem atual: <span className="font-semibold">{imagemAtual}</span>
                </p>
              ) : (
                <p className="text-xs text-neutral-dark/70 mb-2">Sem imagem cadastrada.</p>
              )}

              <input
                className="w-full border rounded-lg p-2"
                type="file"
                accept="image/*"
                onChange={(e) => setNovaImagem(e.target.files?.[0] || null)}
              />
              <p className="text-xs text-neutral-dark/60 mt-1">
                Se não escolher arquivo, a imagem atual será mantida.
              </p>
            </div>

            {erro && <p className="text-sm text-red-600">{erro}</p>}

            <div className="flex gap-2">
              <button
                disabled={salvando}
                className="bg-primary text-white rounded-lg px-4 py-2 font-semibold hover:opacity-90 disabled:opacity-60"
              >
                {salvando ? "Salvando..." : "Salvar alterações"}
              </button>

              <button
                type="button"
                onClick={() => router.push("/admin/noticias")}
                className="border rounded-lg px-4 py-2 font-semibold hover:bg-neutral-50"
              >
                Voltar
              </button>
            </div>
          </form>
        )}
      </div>
    </PageBase>
  );
}
