import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
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

const buildOrder = (userId: string, status: string, expiresAt: string) => {
    return new Order({ userId: userId, status: status, expiresAt: expiresAt });
}

export { Order, buildOrder };