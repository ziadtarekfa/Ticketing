import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../app';
import { Ticket, buildTicket } from '../../models/ticket';

it('fetches the order', async () => {
  // Create a ticket
  const ticket = buildTicket(
    new mongoose.Types.ObjectId().toHexString(),
    'concert',
    20
  );
  await ticket.save();

  const cookie = await global.signin();
  // make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', cookie)
    .send({ ticketId: ticket._id })
    .expect(201);

  // make request to fetch the order
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order._id}`)
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(fetchedOrder._id).toEqual(order._id);
});

it('returns an error if one user tries to fetch another users order', async () => {
  // Create a ticket
  const ticket = buildTicket(
    new mongoose.Types.ObjectId().toHexString(),
    'concert',
    20
  );
  await ticket.save();

  const cookie = await global.signin();
  // make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', cookie)
    .send({ ticketId: ticket._id })
    .expect(201);

  // make request to fetch the order
  await request(app)
    .get(`/api/orders/${order._id}`)
    .set('Cookie', await global.signin())
    .expect(401);
});
