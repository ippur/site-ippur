// src/lib/api.js

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://backend-site-eq0r.onrender.com/api";

// helper interno: tenta ler mensagem de erro do backend
async function parseError(res) {
  try {
    const data = await res.json();
    return data?.error || data?.message || "Erro na requisição";
  } catch {
    return "Erro na requisição";
  }
}

// GET (público) genérico
export async function fetchAPI(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

// Login (retorna { token, usuario })
export async function login(email, senha) {
  const res = await fetch(`${BASE_URL}/usuarios/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  if (!res.ok) {
    const msg = await parseError(res);
    throw new Error(msg || "Login inválido");
  }
  return res.json();
}

/* =========================
   TRANSPARÊNCIA
========================= */

// Listar documentos (GET)
export async function listDocumentosTransparencia(token) {
  const res = await fetch(`${BASE_URL}/transparencia`, {
    cache: "no-store",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!res.ok) {
    const msg = await parseError(res);
    throw new Error(msg || "Falha ao listar documentos");
  }
  return res.json();
}

// Criar documento (multipart)
export async function createDocumentoTransparencia(formData, token) {
  const res = await fetch(`${BASE_URL}/transparencia`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!res.ok) {
    const msg = await parseError(res);
    throw new Error(msg || "Falha ao enviar documento");
  }
  return res.json();
}

// Excluir documento
export async function deleteDocumentoTransparencia(id, token) {
  const res = await fetch(`${BASE_URL}/transparencia/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const msg = await parseError(res);
    throw new Error(msg || "Falha ao excluir documento");
  }
  return res.json();
}
