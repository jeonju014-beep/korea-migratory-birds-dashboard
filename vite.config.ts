import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { apiProxyMiddleware } from './server/middleware';

function apiProxyPlugin(serviceKey: string): Plugin {
  const middleware = apiProxyMiddleware(serviceKey);

  return {
    name: 'api-proxy',
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: env.VITE_BASE_PATH || '/',
    plugins: [react(), apiProxyPlugin(env.DATA_GO_KR_SERVICE_KEY ?? '')],
    server: {
      host: '127.0.0.1',
      port: 5173,
      strictPort: false,
      open: true,
    },
    preview: {
      host: '127.0.0.1',
      port: 4173,
      strictPort: false,
    },
  };
});
