import type { Connect } from 'vite';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { createApiHandler } from './apiProxy';

export function apiProxyMiddleware(serviceKey: string): Connect.NextHandleFunction {
  const handler = createApiHandler(serviceKey);

  return (req, res, next) => {
    if (!req.url?.startsWith('/api/')) {
      next();
      return;
    }

    void handler(req as IncomingMessage, res as ServerResponse);
  };
}
