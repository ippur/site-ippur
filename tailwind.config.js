/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1e40af", // Azul institucional IPPUR
          light: "#3b82f6",   // Azul claro (hover, destaques)
          dark: "#1e3a8a",    // Azul profundo (borda, footer)
        },
        secondary: {
          DEFAULT: "#f59e0b", // Dourado institucional IPPUR
          light: "#fbbf24",
          dark: "#b45309",
        },
        neutral: {
          light: "#f9fafb",   // Fundo padrão
          medium: "#e5e7eb",  // Bordas suaves
          dark: "#4b5563",    // Texto padrão
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.08)",
        smooth: "0 4px 20px rgba(30,64,175,0.15)",
      },
    },
  },
  plugins: [],
};
