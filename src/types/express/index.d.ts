/* eslint-disable */
import express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload
    }
  }
}
/* eslint-enable */
