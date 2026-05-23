import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { apiProxyMiddleware } from './server/middleware';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'api-proxy',
        configureServer(server) {
          server.middlewares.use(apiProxyMiddleware(env.DATA_GO_KR_SERVICE_KEY ?? ''));
        },
      },
    ],
  };
});
