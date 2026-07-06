import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Frames are large in number — keep chunk warnings quiet, they're static assets, not JS bloat.
    chunkSizeWarningLimit: 2000,
  },
});
