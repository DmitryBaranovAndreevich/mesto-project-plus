import { createCard, deleteCard, deleteLike, getAllCards, setLike } from '../controllers/card';
import { Router } from 'express';

const router = Router();

router.get("/", getAllCards);
router.post("/", createCard);
router.put("/:cardId/likes", setLike);
router.delete("/:cardId/likes", deleteLike);
router.delete("/:cardId", deleteCard);

export default router;