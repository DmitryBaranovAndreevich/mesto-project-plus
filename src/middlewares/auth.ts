import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import InCorrectPassword from '../errors/incorrectPassword';

const { JWT_SECRET = 'dev-key' } = process.env;

export default (req: Request, res: Response, next: NextFunction) => {
  const { cookie } = req.headers;
  if (!cookie) throw new InCorrectPassword();

  const token = cookie.replace('jwt=', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new InCorrectPassword();
  }

  req.user = payload;

  next();
};
