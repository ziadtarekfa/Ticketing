import { Listener, OrderCreatedEvent, Subjects } from "@ziadtarekfatickets/common";
import { Message } from 'node-nats-streaming';
import { buildOrder } from "../../models/order";
export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = 'payment-service';

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const order = buildOrder(data.id, data.version, data.ticket.price, data.userId, data.status);

        await order.save();
        msg.ack();
    }
}