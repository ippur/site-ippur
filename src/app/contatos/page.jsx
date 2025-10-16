"use client";
import PageBase from "@/components/PageBase";
import { useState } from "react";

export default function Contatos() {
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mensagem enviada com sucesso!");
    setForm({ nome: "", email: "", mensagem: "" });
  };

  return (
    <PageBase titulo="Contatos" subtitulo="Entre em contato conosco.">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white shadow-card p-8 rounded-lg border border-neutral-medium"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-primary mb-1">Nome</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
            className="w-full border border-neutral-medium rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-primary mb-1">E-mail</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-neutral-medium rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-primary mb-1">Mensagem</label>
          <textarea
            name="mensagem"
            value={form.mensagem}
            onChange={handleChange}
            rows="5"
            required
            className="w-full border border-neutral-medium rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-secondary text-white px-6 py-2 rounded-md hover:bg-secondary-light transition"
        >
          Enviar Mensagem
        </button>
      </form>
    </PageBase>
  );
}
