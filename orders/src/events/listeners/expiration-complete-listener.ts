import { ExpirationCompleteEvent, Listener, OrderStatus, Subjects, TicketCreatedEvent } from "@ziadtarekfatickets/common";
import { Message } from "node-nats-streaming";
import { buildTicket } from "../../models/ticket";
import { Order } from "../../models/order";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";
import { natsWrapper } from "../../nats-wrapper";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent>{
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
    queueGroupName = 'orders-service';

    async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
        console.log("Received Ticket Published");
        const order = await Order.findById(data.orderId).populate('ticket');
        if (!order) {
            throw new Error('Order Not Found');
        }
        if (order.status === OrderStatus.Complete) {
            return msg.ack();
        }

        order.set({
            status: OrderStatus.Cancelled
        });

        await order.save();

        new OrderCancelledPublisher(natsWrapper.client).publish({
            id: order._id,
            version: order.version,
            ticket: {
                id: order.ticket._id
            }
        });

        msg.ack();
    }
}