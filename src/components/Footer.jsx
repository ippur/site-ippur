export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Instituto de Pesquisa, Planejamento Urbano e Desenvolvimento Sustentável de Redenção – IPPUR
        </p>
        <p className="text-sm mt-1">Desenvolvido por Habeck System Tecnologia</p>
      </div>
    </footer>
  );
}
