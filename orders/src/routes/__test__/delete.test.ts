import mongoose from 'mongoose';
import request from 'supertest';
import app  from '../../app';
import { buildTicket } from '../../models/ticket';
import { Order } from '../../models/order';
import { natsWrapper } from '../../nats-wrapper';
import { OrderStatus } from '@ziadtarekfatickets/common';

it('marks an order as cancelled', async () => {
  // create a ticket with Ticket Model
  const ticket = buildTicket(new mongoose.Types.ObjectId().toHexString(), 'concert', 20);
  await ticket.save();

  const user = await global.signin();
  // make a request to create an order
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket._id })
    .expect(201);

  // make a request to cancel the order
  await request(app)
    .delete(`/api/orders/${order._id}`)
    .set('Cookie', user)
    .expect(204);

  // expectation to make sure the thing is cancelled
  const updatedOrder = await Order.findById(order._id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('emits a order cancelled event', async () => {
  const ticket = buildTicket(new mongoose.Types.ObjectId().toHexString(), 'concert', 20);
  await ticket.save();

  const user = await global.signin();
  // make a request to create an order
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket._id })
    .expect(201);

  // make a request to cancel the order
  await request(app)
    .delete(`/api/orders/${order._id}`)
    .set('Cookie', user)
    .expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
