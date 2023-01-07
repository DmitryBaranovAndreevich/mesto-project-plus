import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  createCard,
  deleteCard,
  deleteLike,
  getAllCards,
  setLike,
} from '../controllers/card';

const router = Router();

router.get('/', getAllCards);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().domain().required(),
    }),
  }),
  createCard,
);
router.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().required(),
    }),
  }),
  setLike,
);
router.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().required(),
    }),
  }),
  deleteLike,
);
router.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().required(),
    }),
  }),
  deleteCard,
);

export default router;
