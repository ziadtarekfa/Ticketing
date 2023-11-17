import { Listener, NotFoundError, Subjects, TicketUpdatedEvent } from "@ziadtarekfatickets/common";
import { Message } from "node-nats-streaming";
import { Ticket, buildTicket } from "../../models/ticket";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent>{
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
    queueGroupName = 'orders-service';

    async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
        const ticket = await Ticket.findById(data.id);
        if (!ticket) {
            throw new NotFoundError();
        }
        const { title, price } = data;
        ticket.set({ title, price });
        await ticket.save();
        msg.ack();
    }
}