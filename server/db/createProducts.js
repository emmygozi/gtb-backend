import debuggerconsole from 'debug';
import dotenv from 'dotenv';
import pool from './config';

dotenv.config();
const mydebugger = debuggerconsole('app:startup');


const createProducts = async () => {
  const name = process.env.PRODUCT_NAME.split(',');
  const quantity = process.env.PRODUCT_QUANTITY.split(',');
  const distributorid = process.env.PRODUCT_DIST_ID.split(',');
  const price = process.env.PRODUCT_PRICE.split(',');
  const client = await pool.connect();
  await client
    .query(`INSERT INTO product ( name, quantity, distributorid, price)
    VALUES ('${name[0]}','${quantity[0]}', '${distributorid[0]}', '${price[0]}'),
    ('${name[1]}','${quantity[1]}', '${distributorid[1]}', '${price[1]}'),
    ('${name[1]}','${quantity[1]}', '${distributorid[1]}', '${price[1]}'),;`,
    () => mydebugger({ message: 'Created some products' }));
  client.release();
};

createProducts();
