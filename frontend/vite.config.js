import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/get_decks": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
      "/get_flashcards": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
  define: {
    // eslint-disable-next-line no-undef
    "process.env": process.env,
  },
});
