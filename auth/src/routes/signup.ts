import { Router, Request, Response, NextFunction } from "express";
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from "../errors/request-validation-error";
// import { DatabaseConnectionError } from "../errors/database-connection-error";
import { User, buildUser } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";

const router = Router();

router.post('/api/users/signup', [
    body("email").isEmail().withMessage("Email must be valid !"),
    body("password").trim().isLength({ min: 4, max: 20 })
        .withMessage("Password must be between 4 and 20 characters")
],
    async (req: Request, res: Response, next: NextFunction) => {


        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            next(new RequestValidationError(errors.array()));
        }
        else {

            const { email, password } = req.body;
            const existingUser = await User.findOne({ email: email });

            if (existingUser) {
                next(new BadRequestError('Email in use'));
                return;
            }

            const user = buildUser(email, password);
            await user.save();

            res.status(201).send(user);

        }


    });

export { router as signUpRouter };