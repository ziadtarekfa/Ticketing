import Bull from "bull";
import { ExpirationCompletePublisher } from "../events/publishers/expiration-completed-publisher";
import { natsWrapper } from "../nats-wrapper";



export const expirationQueue = new Bull('order-expiration', {
    redis: {
        host: process.env.REDIS_HOST
    }
});


expirationQueue.process(async (job) => {
    console.log("I want to publish expiration:complete event for orderId", job.data.orderId);

    await new ExpirationCompletePublisher(natsWrapper.client).publish({
        orderId: job.data.orderId
    });
});

