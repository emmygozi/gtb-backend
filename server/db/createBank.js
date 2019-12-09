import debuggerconsole from 'debug';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import pool from './config';

dotenv.config();
const mydebugger = debuggerconsole('app:startup');

const createBank = async () => {
  const adminid = process.env.BNK_ADMINID;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(process.env.BNK_PASSWORD, salt);
  const client = await pool.connect();
  await client

    .query(`INSERT INTO bank ( adminid, password)
    VALUES ('${adminid}', '${hashedPassword}');`,
    () => mydebugger({ message: 'Created the bank' }));
  client.release();
};

createBank();
