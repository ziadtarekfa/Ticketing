import mongoose from "mongoose";
import { Order } from "./order";
import { OrderStatus } from "@ziadtarekfatickets/common";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

export interface ITicket extends mongoose.Document {
    title: string;
    price: number;
    version: number;
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

ticketSchema.set('versionKey', 'version');
ticketSchema.plugin(updateIfCurrentPlugin);

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
    return new Ticket({ _id: _id, title: title, price: price });
}

export { Ticket, buildTicket };