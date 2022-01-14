/*
 * Node Redis client publisher and subscriber
 */
import redis from 'redis';

const subscriber = redis.createClient();
const channel = 'holberton school channel';

subscriber.on('ready', () => console.log('Redis client connected to the server'));

subscriber.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
});

subscriber.on('message', (channel, message) => {
  console.log(message);
  if (message === 'KILL_SERVER') {
    subscriber.unsubscribe();
    subscriber.quit();
  }
});

subscriber.subscribe(channel);
