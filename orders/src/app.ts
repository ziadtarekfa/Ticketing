import express from "express";
import { currentUser, errorHandler } from "@ziadtarekfatickets/common";
import { NotFoundError } from "@ziadtarekfatickets/common";
import { json } from "body-parser";
import cookieParser from 'cookie-parser';

import { showOrderRouter } from "./routes/show";
import { indexOrderRouter } from "./routes";
import { createOrderRouter } from "./routes/new";
import { deleteOrderRouter } from "./routes/delete";



const app = express();
app.use(json());
app.use(cookieParser());
app.use(currentUser);


app.use(indexOrderRouter);
app.use(showOrderRouter)
app.use(createOrderRouter);
app.use(deleteOrderRouter);


app.all('*', (_req, _res) => {
    throw new NotFoundError();
});

app.use(errorHandler);


export default app;