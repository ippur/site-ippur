// src/lib/api.js

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://backend-site-eq0r.onrender.com/api";

/**
 * Função auxiliar para requisições GET à API IPPUR.
 * @param {string} endpoint - caminho da API (ex: '/noticias' ou '/licitacoes')
 * @returns {Promise<any>} - dados retornados pelo servidor
 */
export async function fetchAPI(endpoint) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      next: { revalidate: 60 }, // revalida a cada 1 min (para SSR)
    });

    if (!res.ok) {
      throw new Error(`Erro ${res.status}: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Erro ao acessar API:", error);
    return [];
  }
}
