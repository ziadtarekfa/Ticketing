import mongoose from "mongoose";
import request from "supertest";
import app from "../app";
import { MongoMemoryServer } from "mongodb-memory-server";

declare global {
    var signin: () => Promise<string[]>;
}

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = "abcf";
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri);

});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signin = async () => {

    const cookie =
        [
            'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDYyNmVmZjQ2ZmY4MDFlYThhYWFhNyIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTY5OTA5NjMwM30.hehlXb4cL7u6eqEbShII0Onv5RjCkMunDQE8i36unSE; Path=/'
        ];

    return cookie;
};