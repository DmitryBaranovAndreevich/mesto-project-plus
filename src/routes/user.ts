import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getUserInfo,
  getUser,
  getUsers,
  updateAvatar,
  updateProfile,
} from '../controllers/user';

const router = Router();

router.get('/me', getUserInfo);
router.get('/', getUsers);
router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().alphanum().required(),
    }),
  }),
  getUser,
);
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().domain().required(),
    }),
  }),
  updateAvatar,
);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(200),
    }),
  }),
  updateProfile,
);

export default router;
