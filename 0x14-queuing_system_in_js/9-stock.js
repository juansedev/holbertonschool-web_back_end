import express from 'express';
import redis from 'redis';
import { promisify } from 'util';

const listProducts = [
  {
    id: 1,
    name: 'Suitcase 250',
    price: 50,
    stock: 4,
  },
  {
    id: 2,
    name: 'Suitcase 450',
    price: 100,
    stock: 10,
  },
  {
    id: 3,
    name: 'Suitcase 650',
    price: 350,
    stock: 2,
  },
  {
    id: 4,
    name: 'Suitcase 1050',
    price: 550,
    stock: 5,
  },
];

/**
 * Utils - Get item by id
 * @param  { Number } id of the product object data
 * @return { Object } item from listProducts with the same id
 */

const getItemById = (id) => {
  const itemId = Number(id);
  if (Number.isNaN(itemId)) return undefined;
  return listProducts.find((item) => item.id === itemId);
};

/**
 * Utils - Returns an object with custom format
 * @param  { Object }  product item
 * @return { Object }  product item with custom format
 */
const getItemFormat = (item) => ({
  itemId: item.id,
  itemName: item.name,
  price: item.price,
  initialAvailableQuantity: item.stock,
});

/**
 * Redis Client
 */

const client = redis.createClient();
/* client.del(['item.1', 'item.2', 'item.3', 'item.4'], function(err, o) {}); */
client.on('connect', () => {
  console.log(`Redis client connected to http://localhost:${port}`);
})

const getAsync = promisify(client.get).bind(client);

const getCurrentReservedStockById = async (itemId) => getAsync(`item.${itemId}`);

const reserveStockById = (itemId, stock) => {
  client.set(`item.${itemId}`, stock === null ? 1 : Number(stock) + 1);
};

/**
 * Express Server
 */

const port = 1245;

const server = express();

/**
 * GET /list_products
 */

server.get('/list_products', (request, response) => {
  const formatted = listProducts.map((item) => getItemFormat(item));
  response.json(formatted);
});

/**
 * GET /list_products/:itemId
 */

server.get('/list_products/:itemId', async (request, response) => {
  const { itemId } = request.params;

  const item = getItemById(itemId);
  const reservedStock = await getCurrentReservedStockById(itemId);

  if (!item) {
    return response.status(404).json({ status: 'Product not found' });
  }
  const resp = {
    ...getItemFormat(item),
    currentQuantity: item.stock - reservedStock,
  };
  return response.json(resp);
});

/**
 * GET /reserve_product/:itemId
 */

server.get('/reserve_product/:itemId', async (request, response) => {
  const { itemId } = request.params;
  const item = getItemById(itemId);

  if (!item) {
    return response.status(404).json({ status: 'Product not found' });
  }

  const reservedStock = await getCurrentReservedStockById(itemId);

  if (reservedStock >= item.stock) {
    return response.status(404).json({ status: 'Not enough stock available', itemId: item.id });
  }
  reserveStockById(item.id, reservedStock);
  return response.json({ status: 'Reservation confirmed', itemId: item.id });
});

server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
