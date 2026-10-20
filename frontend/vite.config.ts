import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // These are browser settings, intentionally included in generated HTML.
  envPrefix: ["VITE_", "GOOGLE_MAPS_"],
  plugins: [react()],
  server: {
    port: 5173,
  },
});
