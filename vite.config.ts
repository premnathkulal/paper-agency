import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("jspdf")) return "jspdf";
            if (id.includes("react")) return "react-vendor";
            return "vendor"; // General vendor chunk
          }
        },
      },
    },
  },
});
