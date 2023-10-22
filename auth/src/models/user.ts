import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: false });

const User = mongoose.model('User', userSchema);

const buildUser = (email: string, password: string) => {
    return new User({ email: email, password: password });
}

export { User, buildUser };