"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import PageBase from "@/components/PageBase";
import { listNoticias, deleteNoticia } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function AdminNoticiasPage() {
  const router = useRouter();
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const token = useMemo(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("ippur_token") || "";
  }, []);

  async function carregar() {
    setErro("");
    setLoading(true);
    try {
      const data = await listNoticias();
      setNoticias(Array.isArray(data) ? data : []);
    } catch (e) {
      setErro(e?.message || "Erro ao carregar notícias.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!token) {
      router.push("/admin/login");
      return;
    }
    carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function handleDelete(id) {
    if (!token) return;
    const ok = confirm("Deseja realmente excluir esta notícia? Essa ação não pode ser desfeita.");
    if (!ok) return;

    try {
      await deleteNoticia(id, token);
      await carregar();
    } catch (e) {
      alert(e?.message || "Falha ao excluir.");
    }
  }

  return (
    <PageBase titulo="Admin • Notícias" subtitulo="Gerencie publicações do portal do IPPUR">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Link
            href="/admin/noticias/nova"
            className="bg-primary text-white rounded-lg px-4 py-2 font-semibold hover:opacity-90"
          >
            + Nova notícia
          </Link>

          <button
            onClick={carregar}
            className="border rounded-lg px-4 py-2 font-semibold hover:bg-neutral-50"
          >
            Atualizar lista
          </button>
        </div>

        {erro && <p className="text-sm text-red-600">{erro}</p>}

        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b">
            <h3 className="font-semibold text-neutral-dark">Notícias publicadas</h3>
            <p className="text-sm text-neutral-dark/70">Editar, excluir e revisar conteúdo.</p>
          </div>

          {loading ? (
            <div className="p-6 text-sm text-neutral-dark/70">Carregando...</div>
          ) : noticias.length === 0 ? (
            <div className="p-6 text-sm text-neutral-dark/70">Nenhuma notícia cadastrada.</div>
          ) : (
            <ul className="divide-y">
              {noticias.map((n) => (
                <li key={n.id} className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <p className="font-semibold text-neutral-dark">{n.titulo}</p>
                    <p className="text-sm text-neutral-dark/70">
                      {n.criadoEm ? new Date(n.criadoEm).toLocaleString("pt-BR") : ""}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/admin/noticias/${n.id}`}
                      className="border rounded-lg px-3 py-2 text-sm font-semibold hover:bg-neutral-50"
                    >
                      Editar
                    </Link>

                    <button
                      onClick={() => handleDelete(n.id)}
                      className="border border-red-300 text-red-700 rounded-lg px-3 py-2 text-sm font-semibold hover:bg-red-50"
                    >
                      Excluir
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </PageBase>
  );
}
