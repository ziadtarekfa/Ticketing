import { Publisher, Subjects, TicketCreatedEvent } from "@ziadtarekfatickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
