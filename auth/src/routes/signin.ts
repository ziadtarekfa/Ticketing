import { NextFunction, Router } from "express";
import { validateRequest } from "../middlewares/validate-request";
import { body } from "express-validator";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import bcrypt from "bcrypt";
import { BadRequestError } from "../errors/bad-request-error";

const router = Router();

router.post('/api/users/signin', [
    body("email").isEmail().withMessage("Email must be valid !"),
    body("password").trim()
],
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email: email });

        if (!existingUser) {
            next(new BadRequestError('Invalid Credentials'));
            return;
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (passwordMatch) {
            // GENERATE jwt
            const token = jwt.sign({
                id: existingUser._id,
                email: existingUser.email
            }, process.env.JWT_KEY!);

            res.cookie('jwt', token);
            res.status(200).send({ token: token });
        }
        else {
            next(new BadRequestError('Invalid Credentials'));
        }

    });

export { router as signInRouter };