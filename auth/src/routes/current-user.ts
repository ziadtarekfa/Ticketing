import { Router } from "express";
import jwt from "jsonwebtoken";
const router = Router();

router.get('/api/users/currentuser', (req, res) => {


    if (!req.cookies.jwt) {
        res.status(401).send({ currentUser: null });
        return;
    }

    try {
        const payload = jwt.verify(req.cookies.jwt, process.env.JWT_KEY!);
        res.status(200).send({ currentUser: payload });
    } catch (err) {
        res.status(401).send({ currentUser: null });
    }


});

export { router as currentUserRouter };