import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import babel from 'vite-plugin-babel';
import { createStyleImportPlugin } from 'vite-plugin-style-import'; // 1. 引入插件

export default defineConfig({
  plugins: [
    react(),
    babel(), // 2. 使用 babel 插件
    createStyleImportPlugin({
      libs: [
        {
          libraryName: 'antd',
          esModule: true,
          resolveStyle: (name) => `antd/es/${name}/style/index.less`,
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#1DA57A', // 可自定义主题色
        },
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // 目标服务器地址
        changeOrigin: true,                // 是否改变请求源头
        rewrite: (path) => path.replace(/^\/api/, '') // 重写路径
      }
    }
  }
});
