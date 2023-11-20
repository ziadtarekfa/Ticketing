import Bull from "bull";



export const expirationQueue = new Bull('order-expiration', {
    redis: {
        host: process.env.REDIS_HOST
    }
});


expirationQueue.process(async (job) => {
    console.log("I want to publish expiration:complete event for orderId", job.data.orderId);
});

