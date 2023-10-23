import express from "express";
import { errorHandler } from "./middlewares/error-handling";
import { json } from "body-parser";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.use(json());
app.use(cookieParser());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);



app.use(errorHandler);

app.all('*', (req, res) => {
    throw new NotFoundError();
})


const start = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log("Connected to MongoDb");
    } catch (err) {
        console.error(err);
    }

    app.listen(3000, () => {
        console.log("Listening on port 3000");
    });
}

start();

