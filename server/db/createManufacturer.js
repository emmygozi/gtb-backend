import debuggerconsole from 'debug';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import pool from './config';

dotenv.config();
const mydebugger = debuggerconsole('app:startup');

const createManufacturer = async () => {
  const name = process.env.MNR_NAME;
  const email = process.env.MNR_EMAIL;
  const phoneNumber = process.env.MNR_PHONENO;
  const accountid = process.env.MNR_ACCT_ID;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(process.env.MNR_PASSWORD, salt);
  const wallet = process.env.MNR_WALLET;
  const client = await pool.connect();
  await client

    .query(`INSERT INTO manufacturer ( name, email, phoneNumber, accountid, wallet, password)
    VALUES ('${name}','${email}', '${phoneNumber}', '${accountid}', '${wallet}', '${hashedPassword}');`,
    () => mydebugger({ message: 'Created some manufacturers' }));
  client.release();
};

createManufacturer();
