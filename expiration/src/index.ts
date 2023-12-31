import { OrderCreatedListener } from "./events/listeners/order-created-listener";
import { natsWrapper } from "./nats-wrapper";
const start = async () => {
    try {
        await natsWrapper.connect(process.env.NATS_CLUSTERID!, process.env.NATS_CLIENTID!, process.env.NATS_URL!);

        natsWrapper.client.on('close', () => {
            console.log('Connection is closed');
            process.exit();
        });
        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());

        new OrderCreatedListener(natsWrapper.client).listen();
    } catch (err) {
        console.error(err);
    }
}

start();

