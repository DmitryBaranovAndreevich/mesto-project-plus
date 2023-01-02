import express from 'express';
import mongoose from 'mongoose';
import { Request, Response, NextFunction } from "express";
import userRouter from './routes/user';
import cardRouter from './routes/card';
import { errorHandler } from './helpers/errorHandler';
import { limiter } from './middlewares/apiLimiter';
import helmet from "helmet";
const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/mestodb');
app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '63adf2bd3845677fe1065a19'
  };

  next();
});
app.use(limiter);
app.use(helmet());
app.use("/users", userRouter);
app.use("/cards", cardRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})