import User from "../models/user";
import { Request, Response } from "express";

const params = {
  new: true,
  runValidators: true,
};

export const getUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users) => res.send({ allUsers: users }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

export const getUser = (req: Request, res: Response) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => res.send(user))
    .catch(() => res.status(404).send({ message: "Пользователь не найден" }));
};

export const createUser = (req: Request, res: Response) => {
  User.create(req.body)
    .then((user) => res.send(user))
    .catch((err) => res.status(400).send(err));
};

export const updateProfile = (req: Request, res: Response) => {
  User.findByIdAndUpdate(req.user?._id, req.body, params)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Пользователь не найден" }));
};

export const updateAvatar = (req: Request, res: Response) => {
  User.findByIdAndUpdate(req.user?._id, req.body, params)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Пользователь не найден" }));
};
