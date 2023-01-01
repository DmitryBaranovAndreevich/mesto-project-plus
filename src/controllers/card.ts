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
  const { name: cardName, link: cardLink } = req.body;
  Card.create({
    name: cardName,
    link: cardLink,
    owner: req.user?._id,
  })
    .then((card) => {
      if (!card) throw new InCorrectDataError();
      res.send(card);
    })
      .catch(err => {
      if(err.statusCode) next(err);
      next(new InCorrectDataError())
    });
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) throw new NotFoundError("Нет карточки с таким ID");
      res.send({ data: card });
    })
      .catch(err => {
      if(err.statusCode) next(err);
      next(new NotFoundError("Нет карточки с таким ID"))
    });
};

export const setLike = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const user = req.user?._id;
  Card.findById(cardId)
    .then((card) => {
      if (card) {
        card.likes.push(user);
        card.save();
        return card;
      }
      throw new NotFoundError("Нет карточки с таким ID");
    })
    .then((card) => res.send(card))
      .catch(err => {
      if(err.statusCode) next(err);
      next(new NotFoundError("Нет карточки с таким ID"))
    });
};

export const deleteLike = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const user = req.user?._id;
  Card.findById(cardId)
    .then((card) => {
      if (card) {
        card.likes = card.likes.filter((id) => {
          id.toString() !== user;
        });
        card.save();
        return card;
      }
      throw new NotFoundError("Нет карточки с таким ID");
    })
    .then((card) => res.send(card))
    .catch(err => {
      if(err.statusCode) next(err);
      next(new NotFoundError("Нет карточки с таким ID"))
    });
};
