/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🎨 Paleta inspirada na bandeira de Redenção-PA
        primary: {
          DEFAULT: "#004D40",   // Verde institucional escuro
          light: "#00695C",     // Verde suave para hover ou texto
          dark: "#00332E",      // Versão mais escura para contraste
        },
        secondary: {
          DEFAULT: "#FFD700",   // Amarelo ouro
          light: "#FFE34D",     // Amarelo claro
          dark: "#C9A635",      // Dourado da corrente
        },
        accent: {
          brown: "#8B4513",     // Marrom do tronco central
          gold: "#C9A635",      // Dourado secundário
        },
        neutral: {
          light: "#FFFFFF",     // Branco puro
          dark: "#1C1C1C",      // Preto/cinza profundo
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [],
}
