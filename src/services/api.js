// src/services/api.js
const API_BASE = "https://backend-site-eq0r.onrender.com/api";

export async function fetchNoticias() {
  try {
    const response = await fetch(`${API_BASE}/noticias`);
    if (!response.ok) throw new Error("Erro ao buscar notícias");
    return await response.json();
  } catch (error) {
    console.error("Erro na API (notícias):", error);
    return [];
  }
}

export async function fetchLicitacoes() {
  try {
    const response = await fetch(`${API_BASE}/licitacoes`);
    if (!response.ok) throw new Error("Erro ao buscar licitações");
    return await response.json();
  } catch (error) {
    console.error("Erro na API (licitações):", error);
    return [];
  }
}

export async function fetchTransparencia() {
  try {
    const response = await fetch(`${API_BASE}/transparencia`);
    if (!response.ok) throw new Error("Erro ao buscar dados de transparência");
    return await response.json();
  } catch (error) {
    console.error("Erro na API (transparência):", error);
    return [];
  }
}
