import express, { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '@ziadtarekfatickets/common';
import { Ticket } from '../models/ticket';
const router = express.Router();

router.get(
    '/api/tickets/:id',
    async (req: Request, res: Response, next: NextFunction) => {

        try {

            const ticket = await Ticket.findOne({ _id: req.params.id });

            if (!ticket) {
                next(new NotFoundError());
            }
            else {
                res.status(200).send(ticket);
            }

        } catch (err) {
            next(err);
        }

    }
);

export { router as showTicketRouter };
