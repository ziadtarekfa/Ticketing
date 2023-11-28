import mongoose from 'mongoose';
import request from 'supertest';
import { OrderStatus } from '@ziadtarekfatickets/common';
import app from '../../app';
import { Order, buildOrder } from '../../models/order';
import { stripe } from '../../stripe';
import { Payment } from '../../models/payment';

it('returns a 404 when purchasing an order that does not exist', async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .post('/api/payment')
    .set('Cookie', await global.signin(userId))
    .send({
      token: 'asldkfj',
      orderId: new mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});

it('returns a 401 when purchasing an order that doesnt belong to the user', async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();
  const order = buildOrder(
    new mongoose.Types.ObjectId().toHexString(),
    0,
    20,
    new mongoose.Types.ObjectId().toHexString(),
    OrderStatus.Created
  );
  await order.save();

  await request(app)
    .post('/api/payment')
    .set('Cookie', await global.signin(userId))
    .send({
      token: 'asldkfj',
      orderId: order._id.toHexString(),
    })
    .expect(401);
});

it('returns a 401 when purchasing a cancelled order', async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();
  const order = buildOrder(
    new mongoose.Types.ObjectId().toHexString(),
    0,
    20,
    new mongoose.Types.ObjectId().toHexString(),
    OrderStatus.Cancelled
  );
  await order.save();

  await request(app)
    .post('/api/payment')
    .set('Cookie', await global.signin(userId))
    .send({
      orderId: order._id,
      token: 'asdlkfj',
    })
    .expect(401);
});

