import { Listener, OrderCreatedEvent, Subjects } from "@ziadtarekfatickets/common";
import { Message } from 'node-nats-streaming';
export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = 'expiration-service';

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {

    }
}