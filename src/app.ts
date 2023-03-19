import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { celebrate, Joi } from 'celebrate';
import { requestLogger, errorLogger } from './middlewares/logger';
import userRouter from './routes/user';
import cardRouter from './routes/card';
import errorHandler from './helpers/errorHandler';
import limiter from './middlewares/apiLimiter';
import auth from './middlewares/auth';
import { createUser, login } from './controllers/user';

const { PORT = 3000, MONGOOSE = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();
app.use(cookieParser());
app.use(express.json());
mongoose.connect(MONGOOSE);

app.use(helmet());
app.use(requestLogger);
app.use(limiter);
// app.get("/crash-test", () => {
//   setTimeout(() => {
//     throw new Error("Сервер сейчас упадёт");
//   }, 0);
// });
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(200),
      avatar: Joi.string().domain(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser,
);
app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
