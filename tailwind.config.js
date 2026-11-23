/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        background: "#090a0d",
        surface: "#0f1115",
        "surface-raised": "#14171f",
        border: "#222631",
        claude: {
          warm: "#d97736",
          amber: "#f59e0b",
          sand: "#f5f0e8",
          stone: "#2a2624",
        },
        grok: {
          dark: "#090a0d",
          surface: "#12141a",
          border: "#232732",
          cyan: "#06b6d4",
          alabaster: "#f4f4f5",
        },
        gpt: {
          emerald: "#10b981",
          obsidian: "#0d0e11",
        },
      },
    },
  },
  plugins: [],
}