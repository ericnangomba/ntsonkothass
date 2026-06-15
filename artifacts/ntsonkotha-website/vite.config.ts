import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const rawPort = process.env.PORT || "5173";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH || "/";

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return;
          }

          if (id.includes("/node_modules/react/") || id.includes("\\node_modules\\react\\") || id.includes("/node_modules/react-dom/") || id.includes("\\node_modules\\react-dom\\") || id.includes("/node_modules/scheduler/") || id.includes("\\node_modules\\scheduler\\") || id.includes("/node_modules/react-is/") || id.includes("\\node_modules\\react-is\\")) {
            return "vendor-react";
          }
          if (id.includes("/node_modules/framer-motion/") || id.includes("\\node_modules\\framer-motion\\")) {
            return "vendor-motion";
          }
          if (id.includes("/node_modules/lucide-react/") || id.includes("\\node_modules\\lucide-react\\")) {
            return "vendor-icons";
          }
          if (id.includes("/node_modules/react-icons/") || id.includes("\\node_modules\\react-icons\\")) {
            return "vendor-icons";
          }
          if (id.includes("/node_modules/wouter/") || id.includes("\\node_modules\\wouter\\")) {
            return "vendor-router";
          }
          if (id.includes("/node_modules/@radix-ui/") || id.includes("\\node_modules\\@radix-ui\\")) {
            return "vendor-radix";
          }
          if (id.includes("/node_modules/@tanstack/react-query/") || id.includes("\\node_modules\\@tanstack\\react-query\\") || id.includes("/node_modules/@tanstack/") || id.includes("\\node_modules\\@tanstack\\")) {
            return "vendor-query";
          }
          if (id.includes("/node_modules/recharts/") || id.includes("\\node_modules\\recharts\\")) {
            return "vendor-charts";
          }
          if (id.includes("/node_modules/react-hook-form/") || id.includes("\\node_modules\\react-hook-form\\")) {
            return "vendor-forms";
          }
          if (id.includes("/node_modules/embla-carousel-react/") || id.includes("\\node_modules\\embla-carousel-react\\")) {
            return "vendor-carousel";
          }
          if (id.includes("/node_modules/date-fns/") || id.includes("\\node_modules\\date-fns\\")) {
            return "vendor-date";
          }
          if (id.includes("/node_modules/clsx/") || id.includes("\\node_modules\\clsx\\") || id.includes("/node_modules/class-variance-authority/") || id.includes("\\node_modules\\class-variance-authority\\")) {
            return "vendor-utils";
          }

          return "vendor";
        },
      },
    },
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
