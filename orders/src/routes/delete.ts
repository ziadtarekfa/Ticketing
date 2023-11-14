import express, { Request, Response } from 'express';
// import { Order } from '../models/order';

const router = express.Router();

router.delete('/api/orders/:orderId', async (req: Request, res: Response) => {
    // const tickets = await Ticket.find({});

    res.status(200).send({});
});

export { router as deleteOrderRouter };
