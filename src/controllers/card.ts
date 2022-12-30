import Card from "../models/card";
import { Request, Response } from "express";
import { Schema } from "mongoose";

const params = {
  new: true,
  runValidators: true,
};

export const getAllCards = (req: Request, res: Response) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

export const createCard = (req: Request, res: Response) => {
  const { name: cardName, link: cardLink } = req.body;
  Card.create({
    name: cardName,
    link: cardLink,
    owner: req.user?._id,
  })
    .then((card) => res.send(card))
    .catch((err) => res.status(400).send(err));
};

export const deleteCard = (req: Request, res: Response) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

export const setLike = (req: Request, res: Response) => {
  const { cardId } = req.params;
  const user = req.user?._id;
  Card.findById(cardId)
    .then((card) => {
      card?.likes.push(user);
      card?.save();
      return card;
    })
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

export const deleteLike = (req: Request, res: Response) => {
  const { cardId } = req.params;
  const user = req.user?._id;
  Card.findById(cardId)
    .then((card) => {
      if (card?.likes) {
        card.likes = card?.likes.filter((id) => {
          id.toString() !== user;
        });
        card.save();
        return card;
      }
    })
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};
