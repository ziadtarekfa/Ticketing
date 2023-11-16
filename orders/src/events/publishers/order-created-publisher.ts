import { Publisher, Subjects, OrderCreatedEvent } from "@ziadtarekfatickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
