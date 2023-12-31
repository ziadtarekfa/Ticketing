import { BadRequestError, NotFoundError, OrderStatus, requireAuth, validateRequest } from '@ziadtarekfatickets/common';
import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';
import { buildOrder } from '../models/order';
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';
import { natsWrapper } from '../nats-wrapper';
const router = express.Router();

const EXPIRATION_ORDER_SECONDS = 1 * 60;

router.post('/api/orders', requireAuth, [
    body('ticketId')
        .not()
        .isEmpty()
        .withMessage('Ticket Id must be provided')
], validateRequest, async (req: Request, res: Response, next: NextFunction) => {

    const { ticketId } = req.body;
    // Find the ticket the user is trying to order in the db
    const ticket = await Ticket.findOne({ _id: ticketId });

    if (!ticket) {
        console.log("Ticket is not found");
        next(new NotFoundError());
        return;
    }
    // Make sure ticket is not already reserved
    const isReserved = await ticket.isReserved();
    if (isReserved) {
        next(new BadRequestError('Ticket is already reserved'));
        return;
    }

    // calculate an expiration date for this order

    const expiration = new Date();

    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_ORDER_SECONDS);
    // Build the order and save it to db

    const order = buildOrder(req.currentUser.id, OrderStatus.Created, expiration, ticket);

    await order.save();
    // Publish an event saying than an order was created

    new OrderCreatedPublisher(natsWrapper.client).publish({
        id: order._id,
        version: order.version,
        status: order.status,
        userId: order.userId,
        expiresAt: order.expiresAt.toISOString(),
        ticket: {
            id: ticket._id,
            price: ticket.price
        }
    });

    res.status(201).send(order);
});

export { router as createOrderRouter };
