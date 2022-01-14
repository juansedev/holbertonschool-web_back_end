/*
 * Node Redis client and advanced operations
 */
import redis from 'redis';

const client = redis.createClient();

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
});

client.on('ready', () => {
  console.log('Redis client connected to the server');
});

const hbtnSchools = {
  Portland: 50,
  Seattle: 80,
  'New York': 20,
  Bogota: 20,
  Cali: 40,
  Paris: 2,
};

for (const [key, value] of Object.entries(hbtnSchools)) {
  client.hset('HolbertonSchools', key, value, redis.print);
}

client.hgetall('HolbertonSchools', (err, object) => console.log(object));
