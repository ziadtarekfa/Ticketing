import { OrderStatus } from "@ziadtarekfatickets/common";
import mongoose from "mongoose";
import { ITicket } from "./ticket";

interface OrderDoc extends mongoose.Document {
    userId: string;
    status: OrderStatus;
    expiresAt: Date;
    ticket: ITicket;
    version: number;
}


const orderSchema = new mongoose.Schema<OrderDoc>({
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(OrderStatus)
    },
    expiresAt: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
    }
}, { timestamps: false });

const Order = mongoose.model('Order', orderSchema);

const buildOrder = (userId: string, status: OrderStatus, expiresAt: Date, ticket: any) => {
    return new Order({ userId: userId, status: status, expiresAt: expiresAt, ticket });
}

export { Order, buildOrder };