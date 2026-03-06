"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

const API = process.env.NEXT_PUBLIC_API_URL || "https://backend-site-eq0r.onrender.com";

export default function DocumentosPage() {
  const router = useRouter();
  const [items, setItems] = useState([]);

  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("documento");
  const [data, setData] = useState(() => new Date().toISOString().slice(0, 10));
  const [comentarios, setComentarios] = useState("");
  const [arquivo, setArquivo] = useState(null);

  const [loading, setLoading] = useState(false);

  async function load() {
    try {
      const res = await apiFetch(`${API}/api/transparencia?tipo=documento`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      if (e.message === "401") router.push("/admin/login");
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onUpload(e) {
    e.preventDefault();

    if (!arquivo) return alert("Selecione um arquivo.");
    if (!titulo.trim()) return alert("Informe o título.");
    if (!data) return alert("Informe a data.");

    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("titulo", titulo);
      fd.append("tipo", tipo);
      fd.append("data", data);

      if (comentarios?.trim()) {
        fd.append("comentarios", comentarios);
      }

      fd.append("arquivo", arquivo);

      const res = await apiFetch(`${API}/api/transparencia`, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) throw new Error("Falha no upload");

      setTitulo("");
      setTipo("documento");
      setData(new Date().toISOString().slice(0, 10));
      setComentarios("");
      setArquivo(null);

      await load();
      alert("Documento enviado.");
    } catch (e) {
      if (e.message === "401") router.push("/admin/login");
      else alert("Erro ao enviar documento.");
    } finally {
      setLoading(false);
    }
  }

  async function onDelete(id) {
    if (!confirm("Excluir este documento?")) return;

    try {
      const res = await apiFetch(`${API}/api/transparencia/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Falha ao excluir");

      await load();
    } catch {
      alert("Erro ao excluir.");
    }
  }

  return (
    <main>
      <h1>Upload de Documentos</h1>

      <form onSubmit={onUpload} style={{ marginTop: 16, marginBottom: 24 }}>
        <div style={{ display: "grid", gap: 10, maxWidth: 520 }}>
          <input
            placeholder="Título do documento"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <input
            placeholder="Tipo (ex: portaria, decreto, documento...)"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          />

          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />

          <textarea
            placeholder="Comentários / resumo (opcional)"
            value={comentarios}
            onChange={(e) => setComentarios(e.target.value)}
            rows={4}
          />

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setArquivo(e.target.files?.[0] || null)}
          />

          <button disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </form>

      <h2>Documentos cadastrados</h2>

      <ul style={{ marginTop: 12 }}>
        {items.length === 0 && <li>Nenhum documento cadastrado.</li>}

        {items.map((it) => (
          <li key={it.id} style={{ marginBottom: 12 }}>
            <strong>{it.titulo}</strong> <small>({it.tipo})</small>{" "}
            <small>{new Date(it.data).toLocaleDateString("pt-BR")}</small>

            {it.comentarios && (
              <div style={{ marginTop: 4 }}>
                <small>{it.comentarios}</small>
              </div>
            )}

            <div style={{ marginTop: 6 }}>
              {it.arquivo && (
                <a href={it.arquivo} target="_blank" rel="noreferrer">
                  Abrir
                </a>
              )}

              <button
                onClick={() => onDelete(it.id)}
                style={{ marginLeft: 12, color: "red" }}
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}