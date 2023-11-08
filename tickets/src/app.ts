import express from "express";
import { currentUser, errorHandler } from "@ziadtarekfatickets/common";
import { NotFoundError } from "@ziadtarekfatickets/common";
import { json } from "body-parser";
import cookieParser from 'cookie-parser';

import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes";
import { createTicketRouter } from "./routes/new";
import { updateTicketRouter } from "./routes/update";



const app = express();
app.use(json());
app.use(cookieParser());
app.use(currentUser);


app.use(createTicketRouter);
app.use(showTicketRouter)
app.use(indexTicketRouter);
app.use(updateTicketRouter);


app.all('*', (_req, _res) => {
    throw new NotFoundError();
});

app.use(errorHandler);


export default app;