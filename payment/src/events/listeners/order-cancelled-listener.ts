import { Listener, OrderCancelledEvent, OrderCreatedEvent, OrderStatus, Subjects } from "@ziadtarekfatickets/common";
import { Message } from 'node-nats-streaming';
import { Order, buildOrder } from "../../models/order";
export class OrderCancelledListener extends Listener<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName = 'payment-service';

    async onMessage(data: OrderCancelledEvent['data'], msg: Message) {

        console.log("Payment: Order to cancel");
        console.log(data);
        const order = await Order.findOne({
            _id: data.id,
            version: data.version - 1
        });
        if (!order) {
            throw new Error('Order not found');
        }
        order.set({ status: OrderStatus.Cancelled });
        msg.ack();
    }
}