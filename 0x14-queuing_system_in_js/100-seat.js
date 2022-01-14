import express from 'express';
import kue from 'kue';
import redis from 'redis';
import { promisify } from 'util';

let reservationEnabled = true;

/**
 * Express Server
 */
const port = 1245;
const server = express();

/**
 * Redis Client
 */
const client = redis.createClient();
const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);

const reserveSeat = async (number) => setAsync('available_seats', number);

const getCurrentAvailableSeats = async () => getAsync('available_seats');

client.on('connect', () => {
  console.log(`Redis client connected to http://localhost:${port}`);
});

/**
 * Kue Queue
 */
const queue = kue.createQueue();

/**
 * App Routes
 */

server.get('/available_seats', async (request, response) => {
  const numberOfAvailableSeats = await getCurrentAvailableSeats();
  response.json({ numberOfAvailableSeats });
});

server.get('/reserve_seat', (request, response) => {
  if (!reservationEnabled) {
    return response.json({ status: 'Reservation are blocked' });
  }
  const job = queue.create('reserve_seat', {});
  job.save((err) => {
    if (!err) {
      response.json({ status: 'Reservation in process' });
    } else {
      response.json({ status: 'Reservation failed' });
    }
  });
  job.on('complete', () => {
    console.log(`Seat reservation job ${job.id} completed`);
  });
  job.on('failed', (err) => {
    console.log(`Seat reservation job ${job.id} failed: ${err}`);
  });
});

server.get('/process', async (request, response) => {
  queue.process('reserve_seat', async (job, done) => {
    const availableSeats = await getCurrentAvailableSeats();

    if (availableSeats <= 0) {
      done(Error('Not enough seats available'));
    }
    await reserveSeat(Number(availableSeats) - 1);
    if (availableSeats - 1 <= 0) reservationEnabled = false;
    done();
  });
  response.json({ status: 'Queue processing' });
});

server.listen(port, async () => {
  console.log(`'Can I have a seat? app is listening at http://localhost:${port}`);
  await reserveSeat(50);
});
