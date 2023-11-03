import mongoose from "mongoose";
import app from "./app";
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || '');
        console.log("Connected to MongoDb");
    } catch (err) {
        console.error(err);
    }

    app.listen(3000, () => {
        console.log("Listening on port 3000");
    });
}

start();

