import express from "express";
import mongoose from "mongoose";
import { requestLogger, errorLogger } from './middlewares/logger';
import userRouter from "./routes/user";
import cardRouter from "./routes/card";
import { errorHandler } from "./helpers/errorHandler";
import { limiter } from "./middlewares/apiLimiter";
import helmet from "helmet";
import auth from "./middlewares/auth";
import { createUser, login } from "./controllers/user";
import cookieParser from "cookie-parser";
const { PORT = 3000 } = process.env;

const app = express();
app.use(cookieParser());
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/mestodb");

app.use(limiter);
app.use(helmet());
app.use(requestLogger);
app.post("/signin", login);
app.post("/signup", createUser);
app.use(auth);
app.use("/users", userRouter);
app.use("/cards", cardRouter);

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
