import { Publisher, Subjects, OrderCancelledEvent } from "@ziadtarekfatickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
