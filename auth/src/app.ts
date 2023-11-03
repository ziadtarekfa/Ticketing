import express from "express";
import { errorHandler } from "@ziadtarekfatickets/common";
import { json } from "body-parser";
import cookieParser from 'cookie-parser';
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { NotFoundError } from "@ziadtarekfatickets/common";

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

export default app;