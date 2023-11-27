import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { vitePluginForArco } from '@arco-plugins/vite-vue';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/dist',
  plugins: [vue(), vitePluginForArco()],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'arcoblue-6': '#20bec8',
        },
        javascriptEnabled: true,
      },
    },
  },
});
