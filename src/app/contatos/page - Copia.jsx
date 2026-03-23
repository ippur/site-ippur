"use client";

import PageBase from "@/components/PageBase";
import { useState } from "react";

const WHATSAPP_NUMERO = "5594991122809"; // ajustar
const WHATSAPP_TEXTO =
  "Olá! Gostaria de entrar em contato com o IPPUR para obter mais informações.";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(
  WHATSAPP_TEXTO
)}`;

export default function Contatos() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: "",
  });

  const [anexo, setAnexo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensagemStatus, setMensagemStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setAnexo(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagemStatus("");
    setLoading(true);

    try {
      // Estrutura pronta para o backend
      const formData = new FormData();
      formData.append("nome", form.nome);
      formData.append("email", form.email);
      formData.append("telefone", form.telefone);
      formData.append("assunto", form.assunto);
      formData.append("mensagem", form.mensagem);
      if (anexo) formData.append("anexo", anexo);

      // TODO: ligar na rota do backend quando criarmos
      // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contato`, {
      //   method: "POST",
      //   body: formData,
      // });
      // if (!res.ok) throw new Error("Falha ao enviar mensagem");

      setMensagemStatus(
        "Formulário pronto. Falta apenas ligar ao backend para envio real por e-mail."
      );

      setForm({
        nome: "",
        email: "",
        telefone: "",
        assunto: "",
        mensagem: "",
      });
      setAnexo(null);
    } catch (error) {
      setMensagemStatus("Não foi possível enviar sua mensagem no momento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageBase
      titulo="Contatos"
      subtitulo="Entre em contato com o IPPUR por formulário, e-mail, telefone ou WhatsApp."
    >
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
        <div className="bg-white shadow-card p-8 rounded-xl border border-neutral-medium">
          <h2 className="text-2xl font-semibold text-primary-dark mb-6">
            Envie sua mensagem
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Nome
              </label>
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                required
                className="w-full border border-neutral-medium rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-neutral-medium rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Telefone / WhatsApp
              </label>
              <input
                type="text"
                name="telefone"
                value={form.telefone}
                onChange={handleChange}
                className="w-full border border-neutral-medium rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Assunto
              </label>
              <input
                type="text"
                name="assunto"
                value={form.assunto}
                onChange={handleChange}
                required
                className="w-full border border-neutral-medium rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Mensagem
              </label>
              <textarea
                name="mensagem"
                value={form.mensagem}
                onChange={handleChange}
                rows="6"
                required
                className="w-full border border-neutral-medium rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Anexo (opcional)
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full border border-neutral-medium rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"
              />
              <p className="text-xs text-neutral-dark/60 mt-1">
                Você pode anexar documentos ou imagens.
              </p>
            </div>

            {mensagemStatus && (
              <p className="text-sm text-primary-dark">{mensagemStatus}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-secondary text-white px-6 py-2 rounded-md hover:bg-secondary-light transition disabled:opacity-60"
            >
              {loading ? "Enviando..." : "Enviar Mensagem"}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-white shadow-card p-8 rounded-xl border border-neutral-medium">
            <h2 className="text-2xl font-semibold text-primary-dark mb-4">
              Informações de contato
            </h2>

            <div className="space-y-4 text-neutral-dark">
              <div>
                <p className="font-semibold text-primary">E-mail</p>
                <p>contato@ippur.pa.gov.br</p>
              </div>

              <div>
                <p className="font-semibold text-primary">Telefone / WhatsApp</p>
                <p>(94) 99112-2809</p>
              </div>

              <div>
                <p className="font-semibold text-primary">Atendimento presencial</p>
                <p>IPPUR</p>
                <p>Rua Benedito C Gomes, 82, Núcleo Urbano.</p>
                <p>Redenção – Pará</p>
                <p>CEP: 68553-375</p>                
              </div>

              <div>
                <p className="font-semibold text-primary">Horário de atendimento</p>
                <p>Segunda a sexta, das 8h às 14h</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-card p-8 rounded-xl border border-neutral-medium">
            <h2 className="text-2xl font-semibold text-primary-dark mb-4">
              Fale pelo WhatsApp
            </h2>

            <p className="text-neutral-dark mb-4">
              Prefere um contato mais rápido? Clique no botão abaixo para abrir
              uma conversa diretamente no WhatsApp.
            </p>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition"
            >
              Abrir conversa no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </PageBase>
  );
}