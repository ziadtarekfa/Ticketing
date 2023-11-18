import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface ITicket extends mongoose.Document {
    title: string;
    price: number;
    version: number;
    userId: string;
}

const ticketSchema = new mongoose.Schema<ITicket>({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, { timestamps: false });

ticketSchema.set('versionKey', 'version');
ticketSchema.plugin(updateIfCurrentPlugin);
const Ticket = mongoose.model('Ticket', ticketSchema);

const buildTicket = (title: string, price: number, userId: string) => {
    return new Ticket({ title: title, price: price, userId: userId });
}

export { Ticket, buildTicket };