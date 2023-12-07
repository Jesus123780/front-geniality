import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa';
import reactRefresh from '@vitejs/plugin-react-refresh'

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [
    reactRefresh(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: false
      },
      workbox: {
        swDest: 'sw.js',
        globDirectory: 'dist/',
        globPatterns: [
          '**/*.{js,css,html,png,jpg,json,svg}'
        ],
      },
      manifest: {
        name: 'Mi PWA',
        short_name: 'PWA',
        description: 'Mi aplicación web progresiva',
        start_url: '/',
        display: 'standalone',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
            {
      src: '/icons/icon-72x72.png',
      sizes: '72x72',
      type: 'image/png',
    },
    {
      src: '/icons/icon-96x96.png',
      sizes: '96x96',
      type: 'image/png',
    },
        ],
      },
    })
  ]
})