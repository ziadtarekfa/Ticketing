import { Publisher, Subjects, TicketUpdatedEvent } from "@ziadtarekfatickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
