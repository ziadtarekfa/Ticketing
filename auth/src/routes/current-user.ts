import { Router } from "express";
import { requireAuth } from "../middlewares/require-auth";
import { currentUser } from "../middlewares/current-user";
const router = Router();

router.get('/api/users/currentuser', currentUser, requireAuth, (req, res) => {
    res.status(200).send(req.currentUser);
});

export { router as currentUserRouter };