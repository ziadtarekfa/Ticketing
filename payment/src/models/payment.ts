import mongoose from "mongoose";


interface PaymentDoc extends mongoose.Document {
    orderId: string;
    stripeId: string
}

const paymentSchema = new mongoose.Schema<PaymentDoc>({
    orderId: {
        type: String,
        required: true
    },
    stripeId: {
        type: String,
        required: true,
    }

}, { timestamps: false });


const Payment = mongoose.model('Payment', paymentSchema);

const buildPayment = (orderId: string, stripeId: string) => {
    return new Payment({ orderId: orderId, stripeId: stripeId });
}

export { Payment, buildPayment };