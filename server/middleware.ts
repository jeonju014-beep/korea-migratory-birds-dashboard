import type { Connect } from 'vite';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { createApiHandler } from './apiProxy';

export function apiProxyMiddleware(serviceKey: string): Connect.NextHandleFunction {
  const handler = createApiHandler(serviceKey);

  return (req, res, next) => {
    const path = (req.url?.split('?')[0] ?? '').replace(/\/+$/, '') || '/';
    if (!path.startsWith('/api/')) {
      next();
      return;
    }

    void handler(req as IncomingMessage, res as ServerResponse);
  };
}
