import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React — cached aggressively, changes rarely
          "react-vendor": ["react", "react-dom"],
          // Animation engine — large but stable
          "motion-vendor": ["motion"],
          // GSAP + smooth scroll — loaded early, split for independent caching
          "gsap-vendor": ["gsap", "lenis"],
          // Three.js ecosystem — heaviest chunk, rarely changes
          "three-vendor": [
            "three",
            "@react-three/fiber",
            "@react-three/drei",
            "maath",
          ],
          // Small UI libs — cobe globe, tilt, merge util
          "ui-vendor": ["cobe", "react-tilt", "tailwind-merge"],
          // EmailJS — only needed in the Contact section (lazy)
          "email-vendor": ["@emailjs/browser"],
        },
      },
    },
    chunkSizeWarningLimit: 650,
    sourcemap: false,
    // Preload critical vendor chunks immediately
    modulePreload: {
      polyfill: true,
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "motion", "three", "gsap"],
  },
  css: {
    devSourcemap: true,
  },
});
