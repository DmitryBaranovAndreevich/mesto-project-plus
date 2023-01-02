import User from "../models/user";
import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors/notFoundError";
import { InCorrectDataError } from "../errors/incorrectDataError";

const params = {
  new: true,
  runValidators: true,
};

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => res.send(users))
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
  if (!("avatar" in req.body && "name" in req.body && "about" in req.body))
    throw new InCorrectDataError();
  User.create(req.body)
    .then((user) => {
      if (!user) throw new Error("NotValidData");
      res.send(user);
    })
    .catch((err) => {
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
