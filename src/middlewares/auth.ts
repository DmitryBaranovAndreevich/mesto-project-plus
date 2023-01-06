import { InCorrectPassword } from "../errors/incorrectPassword";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer "))
    throw new InCorrectPassword();

  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, "some-secret-key");
  } catch (err) {
    next(new InCorrectPassword());
  }

  req.body.user = payload;

  next();
};
