"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageBase from "@/components/PageBase";
import { login } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const data = await login(email, senha);
      localStorage.setItem("ippur_token", data.token);
      localStorage.setItem("ippur_user", JSON.stringify(data.usuario || {}));
      router.push("/admin/dashboard");
    } catch (err) {
      setErro("E-mail ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageBase titulo="Acesso Restrito" subtitulo="Área administrativa do IPPUR">
      <div className="max-w-md mx-auto bg-white border rounded-xl p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-neutral-dark mb-1">E-mail</label>
            <input
              className="w-full border rounded-lg p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-dark mb-1">Senha</label>
            <input
              className="w-full border rounded-lg p-2"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              type="password"
              autoComplete="current-password"
              required
            />
          </div>

          {erro && <p className="text-sm text-red-600">{erro}</p>}

          <button
            disabled={loading}
            className="w-full bg-primary text-white rounded-lg py-2 font-semibold hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </PageBase>
  );
}
