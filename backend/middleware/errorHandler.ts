import { Request, Response } from 'express';

export interface StatusError extends Error {
  status?: number;
}

export const errorHandler = (
  error: StatusError,
  req: Request,
  res: Response,
  next: any
) => {
  const status = error.status || 500;
  const message = error.message || 'Internal Server Error';
  res.status(status).json({ status, message });
};
