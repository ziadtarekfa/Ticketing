import { Publisher, Subjects, ExpirationCompleteEvent } from "@ziadtarekfatickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
