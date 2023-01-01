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
    .then((user) => {
      if (!user) throw new NotFoundError("Нет пользователя с таким ID");
      res.send(user);
    })
    .catch((err) => {
      if (err.statusCode) next(err);
      next(new NotFoundError("Нет пользователя с таким ID"));
    });
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  User.create(req.body)
    .then((user) => {
      if (!user) throw new InCorrectDataError();
      res.send(user);
    })
    .catch((err) => {
      if (err.statusCode) next(err);
      next(new InCorrectDataError());
    });
};

export const updateProfile = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  User.findByIdAndUpdate(req.user?._id, req.body, params)
    .then((user) => {
      if (!user||!(("name" in req.body)&&("about" in req.body))) throw new InCorrectDataError();
      res.send(user);
    })
    .catch((err) => {
      if (err.statusCode) next(err);
      next(new InCorrectDataError());
    });
};

export const updateAvatar = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  User.findByIdAndUpdate(req.user?._id, req.body, params)
    .then((user) => {
      if (!user|| !("avatar" in req.body)) throw new InCorrectDataError();
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.statusCode) next(err);
      next(new InCorrectDataError());
    });
};
