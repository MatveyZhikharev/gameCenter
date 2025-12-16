import { Request, Response, NextFunction } from 'express';
import { config } from '../config/env.js';

const unauthorized = (res: Response) =>
  res.status(401).json({ error: 'Unauthorized', message: 'Admin credentials required' });

export const adminAuth = (req: Request, res: Response, next: NextFunction): void => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Basic ')) {
    unauthorized(res);
    return;
  }

  const parts = header.split(' ');
  if (parts.length < 2) {
    unauthorized(res);
    return;
  }

  const base64Credentials = parts[1];
  let decoded = '';

  try {
    decoded = Buffer.from(base64Credentials, 'base64').toString('utf8');
  } catch {
    unauthorized(res);
    return;
  }

  const [login, password] = decoded.split(':', 2);

  if (login === config.admin.login && password === config.admin.password) {
    next();
    return;
  }

  unauthorized(res);
};
