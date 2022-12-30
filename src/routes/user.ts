import { createUser, getUser, getUsers, updateAvatar, updateProfile } from '../controllers/user';
import { Router } from 'express';

const router = Router();

router.get("/", getUsers);
router.get("/:userId", getUser);
router.post("/", createUser);
router.patch("/me/avatar", updateAvatar);
router.patch("/me", updateProfile);

export default router;