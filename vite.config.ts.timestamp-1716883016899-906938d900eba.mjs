// vite.config.ts
import path from "path";
import vue from "file:///C:/Users/diomande/Documents/softsys/erp_frondend_app/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.2.11_@types+node@20.12.12__vue@3.4.27_typescript@5.4.5_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { defineConfig } from "file:///C:/Users/diomande/Documents/softsys/erp_frondend_app/node_modules/.pnpm/vite@5.2.11_@types+node@20.12.12/node_modules/vite/dist/node/index.js";
import tailwind from "file:///C:/Users/diomande/Documents/softsys/erp_frondend_app/node_modules/.pnpm/tailwindcss@3.4.3/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///C:/Users/diomande/Documents/softsys/erp_frondend_app/node_modules/.pnpm/autoprefixer@10.4.19_postcss@8.4.38/node_modules/autoprefixer/lib/autoprefixer.js";
var __vite_injected_original_dirname = "C:\\Users\\diomande\\Documents\\softsys\\erp_frondend_app";
var vite_config_default = defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxkaW9tYW5kZVxcXFxEb2N1bWVudHNcXFxcc29mdHN5c1xcXFxlcnBfZnJvbmRlbmRfYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxkaW9tYW5kZVxcXFxEb2N1bWVudHNcXFxcc29mdHN5c1xcXFxlcnBfZnJvbmRlbmRfYXBwXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9kaW9tYW5kZS9Eb2N1bWVudHMvc29mdHN5cy9lcnBfZnJvbmRlbmRfYXBwL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIlxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCJcblxuaW1wb3J0IHRhaWx3aW5kIGZyb20gXCJ0YWlsd2luZGNzc1wiXG5pbXBvcnQgYXV0b3ByZWZpeGVyIGZyb20gXCJhdXRvcHJlZml4ZXJcIlxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBjc3M6IHtcbiAgICBwb3N0Y3NzOiB7XG4gICAgICBwbHVnaW5zOiBbdGFpbHdpbmQoKSwgYXV0b3ByZWZpeGVyKCldLFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFt2dWUoKV0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgfSxcbiAgfSxcbn0pIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEwVixPQUFPLFVBQVU7QUFDM1csT0FBTyxTQUFTO0FBQ2hCLFNBQVMsb0JBQW9CO0FBRTdCLE9BQU8sY0FBYztBQUNyQixPQUFPLGtCQUFrQjtBQUx6QixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixLQUFLO0FBQUEsSUFDSCxTQUFTO0FBQUEsTUFDUCxTQUFTLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUyxDQUFDLElBQUksQ0FBQztBQUFBLEVBQ2YsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
