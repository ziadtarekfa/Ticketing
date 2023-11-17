import mongoose, { Schema } from "mongoose";
import { Order } from "./order";
import { OrderStatus } from "@ziadtarekfatickets/common";

interface ITicket extends Document {
    title: string;
    price: number;
    isReserved(): Promise<boolean>;
}

const ticketSchema = new mongoose.Schema<ITicket>({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: false });

ticketSchema.methods.isReserved = async function () {
    const existingOrder = await Order.findOne({
        ticket: this,
        status: {
            $in: [
                OrderStatus.Created,
                OrderStatus.AwaitingPayment,
                OrderStatus.Complete
            ]
        }
    });

    return !!existingOrder;
}

const Ticket = mongoose.model('Ticket', ticketSchema);

const buildTicket = (_id: string, title: string, price: number) => {
    return new Ticket({ title: title, price: price });
}

export { Ticket, buildTicket };