import { Router } from "express";
import { requireAuth } from "../middlewares/require-auth";
import { currentUser } from "../middlewares/current-user";
const router = Router();

router.get('/api/users/currentuser', (req, res) => {
    res.status(200).json({ currentUser: "ZIAD TAREK" });
});

export { router as currentUserRouter };