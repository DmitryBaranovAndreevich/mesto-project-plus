import { createUser, getUser, getUsers } from '../controllers/user';
import { Router } from 'express';

const router = Router();

export const getAllUsersRouter = router.get("/", getUsers);
export const getUserRouter = router.get("/:userId", getUser);
export const createUserRouter = router.post("/", createUser);