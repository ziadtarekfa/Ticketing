import mongoose from "mongoose";
import request from "supertest";
import app from "../app";
import jwt from "jsonwebtoken";
import { MongoMemoryServer } from "mongodb-memory-server";

declare global {
    var signin: () => Promise<string[]>;
}
jest.mock('../nats-wrapper');
let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = "abcf";
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri);

});

beforeEach(async () => {
    jest.clearAllMocks();
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
    // Build a JWT payload.  { id, email }

    const token = jwt.sign({
        id: new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com'
    }, process.env.JWT_KEY!);

    [
        'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUxMjk5MmI3NGRmZTZmNGJkMDNkMSIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTcwMTEyMjcxM30.EpMLzsHwfYYCIVAMRXkq2nb1CfTauxKJCBbqm8_nMIY; Path=/'
    ]
    // Build session Object. { jwt: MY_JWT }
    const cookie = `jwt=${token}; Path=/`;
    return [cookie];
};