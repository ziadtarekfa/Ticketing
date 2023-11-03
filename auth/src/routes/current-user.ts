import { Router } from "express";
// import { requireAuth } from "@ziadtarekfatickets/common";
import { currentUser } from "@ziadtarekfatickets/common";
const router = Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
    res.status(200).json({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };