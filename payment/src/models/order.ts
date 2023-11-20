import { OrderStatus } from "@ziadtarekfatickets/common";
import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface OrderDoc extends mongoose.Document {
    userId: string;
    status: OrderStatus;
    version: number;
    price: number;
}


const orderSchema = new mongoose.Schema<OrderDoc>({
    userId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(OrderStatus)
    }
}, { timestamps: false });

orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);
const Order = mongoose.model('Order', orderSchema);

const buildOrder = (_id: string, version: number, price: number, userId: string, status: OrderStatus) => {
    return new Order({ _id: _id, userId: userId, version: version, price: price, status: status });
}

export { Order, buildOrder };