import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { vitePluginForArco } from '@arco-plugins/vite-vue';
import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  base: `/${pkg.name}/dist`,
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
