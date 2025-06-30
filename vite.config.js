import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),vue()],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // บรรทัดนี้สำคัญมาก
  ],
  base: '/Vue-Quick-Warfarin-V2/'
})
