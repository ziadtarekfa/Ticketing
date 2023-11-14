import { requireAuth, validateRequest } from '@ziadtarekfatickets/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
// import { Order } from '../models/order';

const router = express.Router();

router.post('/api/orders', requireAuth, [
    body('ticketId')
        .not()
        .isEmpty()
], validateRequest, async (req: Request, res: Response) => {

    res.status(200).send({});
});

export { router as createOrderRouter };
