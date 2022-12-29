import express from 'express';
import mongoose from 'mongoose';
import { getAllUsersRouter, getUserRouter, createUserRouter } from './routes/user';
const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/mestodb');


app.use("/users", getAllUsersRouter);
app.use("/users", getUserRouter);
app.use("/users", createUserRouter);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})