import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'userApp',
      filename: 'remoteEntry.js',
      exposes: {
        './Login': './src/components/Login.jsx',
        './Register': './src/components/Register.jsx',
      },
      shared: ['react', 'react-dom', 'react-router-dom', '@apollo/client', 'graphql'],
    }),
  ],
  
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
