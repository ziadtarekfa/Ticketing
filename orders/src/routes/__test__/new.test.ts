import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../app';
import { buildOrder } from '../../models/order';
import { buildTicket } from '../../models/ticket';
import { natsWrapper } from '../../nats-wrapper';
import { OrderStatus } from '@ziadtarekfatickets/common';

it('returns an error if the ticket does not exist', async () => {
  const ticketId = new mongoose.Types.ObjectId();

  await request(app)
    .post('/api/orders')
    .set('Cookie', await global.signin())
    .send({ ticketId })
    .expect(404);
});

it('returns an error if the ticket is already reserved', async () => {
  const ticket = buildTicket(
    new mongoose.Types.ObjectId().toHexString(),
    'concert',
    20
  );
  await ticket.save();
  const order = buildOrder(
    'laskdflkajsdf',
    OrderStatus.Created,
    new Date(),
    ticket
  );
  await order.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', await global.signin())
    .send({ ticketId: ticket._id })
    .expect(400);
});

it('reserves a ticket', async () => {
  const ticket = buildTicket(
    new mongoose.Types.ObjectId().toHexString(),
    'concert',
    20
  );
  await ticket.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', await global.signin())
    .send({ ticketId: ticket._id })
    .expect(201);
});

it('emits an order created event', async () => {
  const ticket = buildTicket(
    new mongoose.Types.ObjectId().toHexString(),
    'concert',
    20
  );
  await ticket.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', await global.signin())
    .send({ ticketId: ticket._id })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
