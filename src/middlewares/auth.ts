import { InCorrectPassword } from "../errors/incorrectPassword";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default (req: Request, res: Response, next: NextFunction) => {
  const { cookie } = req.headers;
  if (!cookie) throw new InCorrectPassword();

  const token = cookie.replace("jwt=", "");
  let payload;
  try {
    payload = jwt.verify(token, "some-secret-key");
  } catch (err) {
    throw new InCorrectPassword();
  }

  req.user = payload;

  next();
};
