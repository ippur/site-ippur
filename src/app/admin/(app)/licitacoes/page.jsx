"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function LicitacoesPage() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    try {
      const res = await apiFetch(`${API}/api/transparencia/licitacoes`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      if (e.message === "401") router.push("/admin/login");
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function upload(e) {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("arquivo", file); // IMPORTANTE: seu backend usa "arquivo"

      const res = await apiFetch(`${API}/api/transparencia/licitacoes`, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) throw new Error("Falha no upload");

      setFile(null);
      await load();
      alert("Upload concluído.");
    } catch (e) {
      if (e.message === "401") router.push("/admin/login");
      else alert("Erro no upload.");
    } finally {
      setLoading(false);
    }
  }

  async function remove(id) {
    if (!confirm("Excluir esta licitação?")) return;
    try {
      const res = await apiFetch(`${API}/api/transparencia/licitacoes/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Falha ao excluir");
      await load();
    } catch (e) {
      alert("Erro ao excluir.");
    }
  }

  return (
    <main>
      <h1>Licitações</h1>

      <form onSubmit={upload} style={{ marginTop: 16, marginBottom: 24 }}>
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button disabled={loading || !file} style={{ marginLeft: 8 }}>
          {loading ? "Enviando..." : "Upload"}
        </button>
      </form>

      <h2>Registros</h2>
      <ul style={{ marginTop: 12 }}>
        {items.length === 0 && <li>Nenhuma licitação cadastrada.</li>}

        {items.map((it) => (
          <li key={it.id ?? it._id} style={{ marginBottom: 8 }}>
            <span style={{ marginRight: 10 }}>
              {it.titulo || it.nome || it.numero || it.arquivo || it.filename || `Licitação #${it.id ?? it._id}`}
            </span>

            {it.url && (
              <a href={it.url.startsWith("http") ? it.url : `${API}${it.url}`} target="_blank" rel="noreferrer">
                Abrir
              </a>
            )}

            <button onClick={() => remove(it.id ?? it._id)} style={{ marginLeft: 12, color: "red" }}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}