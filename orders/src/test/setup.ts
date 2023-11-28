import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';


declare global {
    var signin: () => Promise<string[]>;
}
jest.mock('../nats-wrapper');

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = 'abcf';
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

    // Build session Object. { jwt: MY_JWT }
    const cookie = `jwt=${token}; Path=/`;
    return [cookie];
};