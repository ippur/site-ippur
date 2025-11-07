// src/lib/api.js
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Função genérica GET
export async function apiGet(endpoint) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Erro ao buscar: ${endpoint}`);
    return await res.json();
  } catch (error) {
    console.error("Erro na API GET:", error);
    return null;
  }
}

// Função genérica POST (para uso futuro)
export async function apiPost(endpoint, data) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Erro ao enviar para: ${endpoint}`);
    return await res.json();
  } catch (error) {
    console.error("Erro na API POST:", error);
    return null;
  }
}
