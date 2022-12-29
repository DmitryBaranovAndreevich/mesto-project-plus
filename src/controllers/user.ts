import User from "../models/user";
import { Request, Response } from "express";

export const getUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users) => res.send({ allUsers: users }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

export const getUser = (req: Request, res: Response) => {
  const {userId} = req.params;
  User.findById({userId})
  .then(user => res.send(user))
  .catch(() => res.status(404).send({ message: "Пользователь не найден" }));
};

export const createUser = (req: Request, res: Response) => {
  console.log(req.body);
  const {name: userName, about: userAbout, avatar: userAvatar} = req.body;
  User.create({
    name: userName,
    about: userAbout,
    avatar: userAvatar
  })
  .then((user => res.send(user)))
  .catch(err => res.status(400).send(err))
};
