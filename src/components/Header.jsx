import Link from "next/link";

export default function Header() {
  const navLink = (href, label) => (
    <Link
      href={href}
      className="px-4 py-2 font-medium text-gray-700 hover:text-blue-600"
    >
      {label}
    </Link>
  );

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="IPPUR" className="h-10" />
          <span className="text-xl font-semibold text-blue-700">IPPUR</span>
        </Link>

        <nav className="hidden md:flex space-x-4">
          {navLink("/", "Início")}
          {navLink("/noticias", "Notícias")}
          {navLink("/transparencia", "Transparência")}
          {navLink("/licitacoes", "Licitações")}
          {navLink("/sobre", "Sobre")}
          {navLink("/contatos", "Contatos")}
        </nav>
      </div>
    </header>
  );
}
