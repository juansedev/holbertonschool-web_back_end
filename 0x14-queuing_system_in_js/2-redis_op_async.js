/*
 * Node Redis client and async operations
 * Set/Get Values with ES6 Async/Await
 */
import redis from 'redis';

const { promisify } = require('util');

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
});

client.on('ready', () => {
  console.log('Redis client connected to the server');
});

const setNewSchool = (schoolName, value) => {
  client.set(schoolName, value, redis.print);
};

const displaySchoolValue = async (schoolName) => {
  const reply = await getAsync(schoolName);
  console.log(reply);
};

(async () => {
  await displaySchoolValue('Holberton');
  setNewSchool('HolbertonSanFrancisco', '100');
  await displaySchoolValue('HolbertonSanFrancisco');
})();
