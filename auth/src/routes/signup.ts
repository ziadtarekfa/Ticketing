import { Router, Request, Response, NextFunction } from "express";
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from "../errors/request-validation-error";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
// import { DatabaseConnectionError } from "../errors/database-connection-error";
import { User, buildUser } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";

const router = Router();

router.post('/api/users/signup', [
    body("email").isEmail().withMessage("Email must be valid !"),
    body("password").trim().isLength({ min: 4, max: 20 })
        .withMessage("Password must be between 4 and 20 characters")
],
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {

        console.log("GIIIIIIIIIIIII");

        const { email, password } = req.body;
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            next(new BadRequestError('Email in use'));
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = buildUser(email, hashedPassword);
        await user.save();
        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_KEY!);

        res.cookie('jwt', token);
        res.status(200).send({ id: user._id, email: user.email, token: token });

    });

export { router as signUpRouter };