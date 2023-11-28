import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  var signin: (userId: string) => Promise<string[]>;
}

jest.mock('../nats-wrapper');

process.env.STRIPE_KEY = 'sk_test_hnfrAm8rOkryFEnV23jjfFlw';

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

global.signin = async (userId) => {
  // Build a JWT payload.  { id, email }

  const token = jwt.sign({
    id: userId,
    email: 'test@test.com'
  }, process.env.JWT_KEY!);

  // Build session Object. { jwt: MY_JWT }
  const cookie = `jwt=${token}; Path=/`;
  return [cookie];
};
