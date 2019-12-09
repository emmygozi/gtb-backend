import debuggerconsole from 'debug';
import dotenv from 'dotenv';
import pool from './config';

dotenv.config();
const mydebugger = debuggerconsole('app:startup');

const createPaymentOptions = async () => {
  const client = await pool.connect();
  await client
    .query(`INSERT INTO paymentoption (name)
    VALUES ('paynow'),('preorder');`,
    () => mydebugger({ message: 'Created some paymentoptions' }));
  client.release();
};

createPaymentOptions();
