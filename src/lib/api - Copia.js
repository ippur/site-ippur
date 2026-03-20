// src/lib/api.js

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://backend-site-eq0r.onrender.com";

// sempre trabalhar com /api como prefixo fixo
const BASE_URL = `${API_BASE.replace(/\/$/, "")}/api`;

// helper: pega token do padrão do projeto
export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("ippur_token");
}

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

// =========================
// AUTH
// =========================

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

// =========================
// TRANSPARÊNCIA
// =========================

// Listar documentos (GET) - é público, token é opcional
export async function listDocumentosTransparencia() {
  const token = getToken();
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

// Criar documento (multipart) - admin
export async function createDocumentoTransparencia(formData) {
  const token = getToken();
  if (!token) throw new Error("Token não encontrado");

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

// Excluir documento - admin
export async function deleteDocumentoTransparencia(id) {
  const token = getToken();
  if (!token) throw new Error("Token não encontrado");

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

// =========================
// LICITAÇÕES (ADMIN)
// =========================

export async function listLicitacoes() {
  const res = await fetch(`${BASE_URL}/api/transparencia/licitacoes`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const msg = await parseError(res);
    throw new Error(msg || "Falha ao listar licitações");
  }
  return res.json();
}

export async function createLicitacao(formData) {
  const token = getToken();
  if (!token) throw new Error("Token não encontrado");

  const res = await fetch(`${BASE_URL}/api/transparencia/licitacoes`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!res.ok) {
    const msg = await parseError(res);
    throw new Error(msg || "Falha ao criar licitação");
  }
  return res.json();
}

export async function deleteLicitacao(id) {
  const token = getToken();
  if (!token) throw new Error("Token não encontrado");

  const res = await fetch(`${BASE_URL}/api/transparencia/licitacoes/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const msg = await parseError(res);
    throw new Error(msg || "Falha ao excluir licitação");
  }
  return res.json();
}

// =========================
// NOTÍCIAS
// =========================

export async function listNoticias() {
  const res = await fetch(`${BASE_URL}/noticias`, { cache: "no-store" });
  if (!res.ok) {
    const msg = await parseError(res);
    throw new Error(msg || "Falha ao listar notícias");
  }
  return res.json();
}

export async function getNoticiaById(id) {
  const res = await fetch(`${BASE_URL}/noticias/${id}`, { cache: "no-store" });
  if (!res.ok) {
    const msg = await parseError(res);
    throw new Error(msg || "Falha ao carregar notícia");
  }
  return res.json();
}

export async function createNoticia(formData) {
  const token = getToken();
  if (!token) throw new Error("Token não encontrado");

  const res = await fetch(`${BASE_URL}/noticias`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!res.ok) {
    const msg = await parseError(res);
    throw new Error(msg || "Falha ao criar notícia");
  }
  return res.json();
}

export async function updateNoticia(id, formData) {
  const token = getToken();
  if (!token) throw new Error("Token não encontrado");

  const res = await fetch(`${BASE_URL}/noticias/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!res.ok) {
    const msg = await parseError(res);
    throw new Error(msg || "Falha ao atualizar notícia");
  }
  return res.json();
}

export async function deleteNoticia(id) {
  const token = getToken();
  if (!token) throw new Error("Token não encontrado");

  const res = await fetch(`${BASE_URL}/noticias/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const msg = await parseError(res);
    throw new Error(msg || "Falha ao excluir notícia");
  }
  return res.json();
}

// ====== helper para rotas protegidas (admin) ======
export async function apiFetch(url, options = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("ippur_token") : null;

  const headers = { ...(options.headers || {}) };

  // adiciona Authorization se tiver token
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, { ...options, headers });

  if (res.status === 401) throw new Error("401");
  return res;
}