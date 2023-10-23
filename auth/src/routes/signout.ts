import { Router } from "express";

const router = Router();

router.post('/api/users/signout', (req, res) => {
    res.clearCookie('jwt');
    res.status(200).send({});
});

export { router as signOutRouter };