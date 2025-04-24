declare module "vite-plugin-cross-origin-isolation" {
  import type { Plugin } from "vite";

  /**
   * Vite plugin to add Cross-Origin-Isolation headers
   * @returns Vite plugin instance
   */
  export default function crossOriginIsolation(): Plugin;
}
