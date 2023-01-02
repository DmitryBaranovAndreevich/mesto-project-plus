import Card from "../models/card";
import { NextFunction, Request, Response } from "express";
import { InCorrectDataError } from "../errors/incorrectDataError";
import { NotFoundError } from "../errors/notFoundError";

export const getAllCards = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  if(!("name" in req.body&&"link" in req.body)) throw new InCorrectDataError();
  const { name: cardName, link: cardLink } = req.body;
  Card.create({
    name: cardName,
    link: cardLink,
    owner: req.user?._id,
  })
    .then((card) => {
      if (!card) throw new Error("NotValidData");
      res.send(card);
    })
    .catch((err) => {
      if (err.message === "NotValidData") next(new InCorrectDataError());
      else next(new Error());
    });
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail(new NotFoundError("Нет карточки с таким ID"))
    .then((card) => {
      res.send({ card });
    })
    .catch(next);
};

export const setLike = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const user = req.user?._id;
  Card.findById(cardId)
    .orFail(new NotFoundError("Нет карточки с таким ID"))
    .then((card) => {
      if (card) {
        card.likes.push(user);
        card.save();
        return card;
      }
    })
    .then((card) => res.send(card))
    .catch(next);
};

export const deleteLike = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const user = req.user?._id;
  Card.findById(cardId)
    .orFail(new NotFoundError("Нет карточки с таким ID"))
    .then((card) => {
      if (card) {
        card.likes = card.likes.filter((id) => {
          id.toString() !== user;
        });
        card.save();
        return card;
      }
    })
    .then((card) => res.send(card))
    .catch(next);
};
