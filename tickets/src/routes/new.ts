import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@ziadtarekfatickets/common';
import { buildTicket } from '../models/ticket';

const router = express.Router();

router.post(
    '/api/tickets',
    requireAuth,
    [
        body('title').not().isEmpty().withMessage('Title is required'),
        body('price')
            .isFloat({ gt: 0 })
            .withMessage('Price must be greater than 0'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        console.log("HELLOW WORLD");

        const { title, price } = req.body;

        const ticket = buildTicket(title, price, req.currentUser!.id);

        await ticket.save();
        res.status(201).send(ticket);
    }
);

export { router as createTicketRouter };
