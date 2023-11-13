import mongoose from "mongoose";
import app from "./app";
import { natsWrapper } from "./nats-wrapper";
const start = async () => {
    try {
        await natsWrapper.connect('ticketing', 'vdvdf', 'http://nats-srv:4222');

        natsWrapper.client.on('close', () => {
            console.log('Connection is closed');
            process.exit();
        });
        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());
        await mongoose.connect(process.env.MONGO_URI || '');

        console.log("Connected to MongoDb");
    } catch (err) {
        console.log("FUCK");

        console.error(err);
    }

    app.listen(3000, () => {
        console.log("Listening on port 3000");
    });
}

start();

