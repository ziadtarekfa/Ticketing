import { BadRequestError, NotAuthorizedError, NotFoundError, OrderStatus, requireAuth, validateRequest } from "@ziadtarekfatickets/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Order } from "../models/order";
import { stripe } from "../stripe";
import { buildPayment } from "../models/payment";
import { PaymentCreatedPublisher } from "../events/publishers/payment-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();
router.post('/api/payment', requireAuth, [
    body('token').not().isEmpty(),
    body('orderId').not().isEmpty()
], validateRequest,
    async (req: Request, res: Response) => {

        const { token, orderId } = req.body;
        const order = await Order.findById(orderId);
        if (!order) {
            throw new NotFoundError();
        }
        if (order.userId !== req.currentUser.id) {
            throw new NotAuthorizedError();
        }
        if (order.status === OrderStatus.Cancelled) {
            throw new BadRequestError("Cannot handle cancelled order");
        }

        const charge = await stripe.charges.create({
            currency: 'usd',
            amount: order.price * 100,
            source: token
        });

        const payment = buildPayment(orderId, charge.id);

        await payment.save();

        new PaymentCreatedPublisher(natsWrapper.client).publish({
            id: payment._id,
            orderId: payment.orderId,
            stripeId: payment.stripeId
        });
        res.send({ success: true });
    });


export { router as createChargeRouter };