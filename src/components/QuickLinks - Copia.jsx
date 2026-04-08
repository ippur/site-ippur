"use client";

import Link from "next/link";
import { Newspaper, FileText, Phone, Info, Scale, Building2, User } from "lucide-react";
import { motion } from "framer-motion";

export default function QuickLinks() {
  const links = [
    {
      id: 1,
      icon: <Newspaper className="w-8 h-8 text-primary" />,
      title: "Notícias",
      desc: "Acompanhe as últimas ações e projetos do IPPUR.",
      href: "/noticias",
    },
    {
      id: 2,
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: "Transparência",
      desc: "Acesse informações e relatórios de gestão.",
      href: "/transparencia",
    },
    {
      id: 3,
      icon: <Scale className="w-8 h-8 text-primary" />,
      title: "Licitações",
      desc: "Confira editais, resultados e avisos oficiais.",
      href: "/licitacoes",
    },
    {
      id: 4,
      icon: <User className="w-8 h-8 text-primary" />,
      title: "Portal do Servidor",
      desc: "Nesta área o servidor público terá acesso aos serviços e informações exclusivas do funcionalismo, além de conteúdos educativos, avisos e informes.",
      href: "https://folha.rpmsolucoes.com.br/login?cnpj=16366277000172",
      externo: true,
    },
    {
      id: 5,
      icon: <Info className="w-8 h-8 text-primary" />,
      title: "Sobre o IPPUR",
      desc: "Saiba mais sobre nossa missão e estrutura.",
      href: "/sobre",
    },
    {
      id: 6,
      icon: <Phone className="w-8 h-8 text-primary" />,
      title: "Contatos",
      desc: "Fale conosco e tire suas dúvidas.",
      href: "/contatos",
    },
    {
      id: 7,
      icon: <Building2 className="w-8 h-8 text-primary" />,
      title: "Projetos",
      desc: "Conheça as obras e iniciativas em andamento.",
      href: "#",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-serif font-bold text-primary-dark mb-12">
          Acesso Rápido
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {links.map((item, i) => (
            <motion.div
              key={item.id}
              className="bg-neutral-light rounded-xl shadow-card p-8 hover:shadow-smooth transition-shadow cursor-pointer border border-neutral-medium hover:border-secondary"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              {item.externo ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center space-y-4"
                >
                  <div className="bg-primary/10 p-4 rounded-full">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-primary">{item.title}</h3>
                  <p className="text-neutral-dark text-sm">{item.desc}</p>
                </a>
              ) : (
                <Link href={item.href} className="flex flex-col items-center space-y-4">
                  <div className="bg-primary/10 p-4 rounded-full">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-primary">{item.title}</h3>
                  <p className="text-neutral-dark text-sm">{item.desc}</p>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}