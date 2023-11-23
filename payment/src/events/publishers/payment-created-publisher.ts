import { Subjects, Publisher, PaymentCreatedEvent } from '@ziadtarekfatickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
