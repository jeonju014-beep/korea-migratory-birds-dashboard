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
    plugins: [react(), apiProxyPlugin(env.DATA_GO_KR_SERVICE_KEY ?? '')],
  };
});
