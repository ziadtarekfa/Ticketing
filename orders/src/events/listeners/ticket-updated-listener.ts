import { Listener, Subjects, TicketUpdatedEvent } from "@ziadtarekfatickets/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent>{
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
    queueGroupName = 'orders-service';

    async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
        console.log("Received Ticket Updated");

        const ticket = await Ticket.findOne({
            _id: data.id,
            version: data.version - 1
        });

        if (!ticket) {
            throw new Error("Ticket Not Found Update");
        }
        const { title, price } = data;
        ticket.set({ title, price });
        await ticket.save();  //increments version automatically
        msg.ack();
    }
}