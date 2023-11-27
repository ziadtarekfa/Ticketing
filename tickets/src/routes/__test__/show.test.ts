import request from "supertest";
import app from "../../app";
import mongoose from "mongoose";

it('returns a 404 if the ticket is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .get(`/api/tickets/${id}`)
        .expect(404);
});


it('returns the ticket if the ticket is found', async () => {
    const cookie = await global.signin();
    const title = 'concert';
    const price = 20;
    // create ticket
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title,
            price
        })
        .expect(201);

    // show ticket
    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body._id}`);

    expect(ticketResponse.body.title).toEqual(title);
    expect(ticketResponse.body.price).toEqual(price);

});