import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors/notFoundError";
import { InCorrectDataError } from "../errors/incorrectDataError";
import { IUser } from "../interface/user";
import { InCorrectPassword } from "../errors/incorrectPassword";
import { EmailDuplicate } from "../errors/emailDuplicate";

const params = {
  new: true,
  runValidators: true,
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  return User.findOne({ email })
    .select("+password")
    .orFail(new NotFoundError("Нет пользователя с таким email"))
    .then((user) =>
      bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) throw new InCorrectPassword();
        const token = jwt.sign({ _id: user._id }, "some-secret-key", {
          expiresIn: "7d",
        });
        res
          .cookie("jwt", token, { maxAge: 3600000 * 24 * 7, httpOnly: true })
          .end();
      })
    )
    .catch(next);
};

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

export const getUserInfo = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  User.findById(req.user?._id)
    .orFail(new InCorrectPassword())
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(new NotFoundError("Нет пользователя с таким ID"))
    .then((user) => res.send(user))
    .catch(next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  if (!("email" in req.body && "password" in req.body))
    throw new InCorrectDataError();
  const { password, ...any } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash: string) => {
      return User.create({ ...any, password: hash });
    })
    .then((user: IUser) => {
      if (!user) throw new Error("NotValidData");
      res.send(user);
    })
    .catch((err: { message: string; code: number }) => {
      if (err.code === 11000) next(new EmailDuplicate());
      if (err.message === "NotValidData") next(new InCorrectDataError());
      else next(new Error());
    });
};

export const updateProfile = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  User.findByIdAndUpdate(req.user?._id, req.body, params)
    .orFail(new NotFoundError("Нет пользователя с таким ID"))
    .then((user) => {
      if (!("name" in req.body && "about" in req.body))
        throw new InCorrectDataError();
      res.send(user);
    })
    .catch(next);
};

export const updateAvatar = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  User.findByIdAndUpdate(req.user?._id, req.body, params)
    .orFail(new NotFoundError("Нет пользователя с таким ID"))
    .then((user) => {
      if (!("avatar" in req.body)) throw new InCorrectDataError();
      res.send({ data: user });
    })
    .catch(next);
};
