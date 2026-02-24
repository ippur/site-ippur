"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function LicitacoesPage() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // campos exigidos pelo backend
  const [titulo, setTitulo] = useState("");
  const [modalidade, setModalidade] = useState("");
  const [status, setStatus] = useState("Aberta");
  const [data, setData] = useState(() => new Date().toISOString().slice(0, 10));
  const [arquivo, setArquivo] = useState(null);

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

  async function onUpload(e) {
    e.preventDefault();

    if (!titulo.trim()) return alert("Informe o título.");
    if (!modalidade.trim()) return alert("Informe a modalidade.");
    if (!data) return alert("Informe a data.");
    if (!arquivo) return alert("Selecione um arquivo.");

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("titulo", titulo);
      fd.append("modalidade", modalidade);
      fd.append("status", status);
      fd.append("data", data);
      fd.append("arquivo", arquivo); // campo certo

      const res = await apiFetch(`${API}/api/transparencia/licitacoes`, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) throw new Error("Falha no upload");

      setTitulo("");
      setModalidade("");
      setStatus("Aberta");
      setData(new Date().toISOString().slice(0, 10));
      setArquivo(null);

      await load();
      alert("Licitação enviada.");
    } catch (e) {
      if (e.message === "401") router.push("/admin/login");
      else alert("Erro ao enviar licitação.");
    } finally {
      setLoading(false);
    }
  }

  async function onDelete(id) {
    if (!confirm("Excluir esta licitação?")) return;
    try {
      const res = await apiFetch(`${API}/api/transparencia/licitacoes/${id}`, {
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
      <h1>Upload de Licitações</h1>

      <form onSubmit={onUpload} style={{ marginTop: 16, marginBottom: 24 }}>
        <div style={{ display: "grid", gap: 10, maxWidth: 520 }}>
          <input
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <input
            placeholder="Modalidade (ex: Pregão, Concorrência...)"
            value={modalidade}
            onChange={(e) => setModalidade(e.target.value)}
          />

          <input
            placeholder="Status (ex: Aberta, Encerrada...)"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />

          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />

          <input
            type="file"
            onChange={(e) => setArquivo(e.target.files?.[0] || null)}
          />

          <button disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </form>

      <h2>Licitações cadastradas</h2>

      <ul style={{ marginTop: 12 }}>
        {items.length === 0 && <li>Nenhuma licitação cadastrada.</li>}

        {items.map((it) => (
          <li key={it.id} style={{ marginBottom: 10 }}>
            <strong>{it.titulo}</strong>{" "}
            <small>({it.modalidade} | {it.status})</small>{" "}
            <small>{new Date(it.data).toLocaleDateString("pt-BR")}</small>

            {it.arquivo && (
              <a
                style={{ marginLeft: 12 }}
                href={`${API}${it.arquivo}`}
                target="_blank"
                rel="noreferrer"
              >
                Abrir
              </a>
            )}

            <button
              onClick={() => onDelete(it.id)}
              style={{ marginLeft: 12, color: "red" }}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}