import { getUserInfo, getUser, getUsers, updateAvatar, updateProfile } from '../controllers/user';
import { Router } from 'express';

const router = Router();

router.get("/", getUsers);
router.get("/:userId", getUser);
router.patch("/me/avatar", updateAvatar);
router.patch("/me", updateProfile);
router.get("/me", getUserInfo);

export default router;