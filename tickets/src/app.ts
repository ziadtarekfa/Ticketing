import express from "express";
import { errorHandler } from "@ziadtarekfatickets/common";
import { NotFoundError } from "@ziadtarekfatickets/common";
import { json } from "body-parser";
import cookieParser from 'cookie-parser';


const app = express();
app.use(json());
app.use(cookieParser());



app.use(errorHandler);

app.all('*', (req, res) => {
    throw new NotFoundError();
})

export default app;