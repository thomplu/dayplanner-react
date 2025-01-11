import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Alias to use '@' for 'src'
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/_fonts.scss" as *;
          @use "@/styles/_variables.scss" as *;
          @use "@/styles/_functions.scss" as *;
          @use "@/styles/_mixins.scss" as *;
        `
      }
    }
  },
  server: {
    port: 3006,
  },
})
