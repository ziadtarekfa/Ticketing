import { Listener, Subjects, TicketCreatedEvent } from "@ziadtarekfatickets/common";
import { Message } from "node-nats-streaming";
import { buildTicket } from "../../models/ticket";

export class TicketCreatedListener extends Listener<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = 'orders-service';

    async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        console.log("Received Ticket Created");

        const { id, title, price } = data;
        const ticket = buildTicket(
            id,
            title,
            price
        );
        await ticket.save();

        console.log("MY TICKET");
        console.log(ticket);

        msg.ack();
    }
}