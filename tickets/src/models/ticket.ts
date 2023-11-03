import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
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

const Ticket = mongoose.model('Ticket', ticketSchema);

const buildTicket = (title: string, price: number, userId: string) => {
    return new Ticket({ title: title, price: price, userId: userId });
}

export { Ticket, buildTicket };