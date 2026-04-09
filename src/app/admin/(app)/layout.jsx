import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* Menu lateral */}
      <aside style={{
        width: "250px",
        background: "#1f2937",
        color: "#fff",
        padding: "20px"
      }}>
        <h2>Painel Admin</h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
          <Link href="/admin/dashboard" style={{ color: "#fff" }}>Dashboard</Link>
          <Link href="/admin/noticias" style={{ color: "#fff" }}>Notícias</Link>
          <Link href="/admin/transparencia" style={{ color: "#fff" }}>Transparência</Link>
        </nav>

        <div style={{ marginTop: "40px" }}>
          <Link href="/admin/login" style={{ color: "#f87171" }}>Sair</Link>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main style={{ flex: 1, padding: "30px" }}>
        {children}
      </main>
    </div>
  );
}
