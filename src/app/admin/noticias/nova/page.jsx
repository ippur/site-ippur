"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PageBase from "@/components/PageBase";
import { createNoticia } from "@/lib/api";

export default function AdminNovaNoticiaPage() {
  const router = useRouter();
  const token = useMemo(() => (typeof window === "undefined" ? "" : localStorage.getItem("ippur_token") || ""), []);

  const [titulo, setTitulo] = useState("");
  const [resumo, setResumo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [imagem, setImagem] = useState(null);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    if (!token) {
      router.push("/admin/login");
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("titulo", titulo);
      fd.append("resumo", resumo);
      fd.append("conteudo", conteudo);
      if (imagem) fd.append("imagem", imagem);

      await createNoticia(fd, token);
      router.push("/admin/noticias");
    } catch (e) {
      setErro(e?.message || "Falha ao criar notícia.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageBase titulo="Admin • Nova Notícia" subtitulo="Publique uma nova notícia no portal">
      <div className="max-w-3xl mx-auto bg-white border rounded-xl p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-neutral-dark mb-1">Título</label>
            <input
              className="w-full border rounded-lg p-2"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
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
              placeholder="<p>Digite aqui...</p>"
            />
            <p className="text-xs text-neutral-dark/60 mt-1">
              Dica: use tags simples como &lt;p&gt;, &lt;strong&gt; e &lt;ul&gt;.
            </p>
          </div>

          <div>
            <label className="block text-sm text-neutral-dark mb-1">Imagem (opcional)</label>
            <input
              className="w-full border rounded-lg p-2"
              type="file"
              accept="image/*"
              onChange={(e) => setImagem(e.target.files?.[0] || null)}
            />
          </div>

          {erro && <p className="text-sm text-red-600">{erro}</p>}

          <div className="flex gap-2">
            <button
              disabled={loading}
              className="bg-primary text-white rounded-lg px-4 py-2 font-semibold hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Publicando..." : "Publicar"}
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
      </div>
    </PageBase>
  );
}
