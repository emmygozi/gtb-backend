import debuggerconsole from 'debug';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import pool from './config';

dotenv.config();
const mydebugger = debuggerconsole('app:startup');

const createDistributors = async () => {
  const name = process.env.DISTR_NAME.split(',');
  const email = process.env.DISTR_EMAIL;
  const logourl = process.env.DISTR_LOGO_URL.split(',');
  const userid = process.env.DISTR_USERID.split(',');
  const accountid = process.env.DISTR_ACCT_ID.split(',');
  const location = process.env.DISTR_LOCATION;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(process.env.DISTR_PASSWORD, salt);
  const client = await pool.connect();

  mydebugger(logourl);
  await client
    .query(`INSERT INTO distributors ( name, email, logourl, userid, password, accountid, location)
    VALUES ('${name[0]}','${email}','${logourl[0]}', '${userid[0]}', '${hashedPassword}','${accountid[0]}','${location}'),
    ('${name[1]}','${email}','${logourl[1]}', '${userid[1]}', '${hashedPassword}','${accountid[1]}','${location}'),
    ('${name[2]}','${email}','${logourl[2]}', '${userid[2]}', '${hashedPassword}','${accountid[2]}','${location}'),
    ('${name[3]}','${email}','${logourl[3]}', '${userid[3]}', '${hashedPassword}','${accountid[3]}','${location}'),
    ('${name[4]}','${email}','${logourl[4]}', '${userid[4]}', '${hashedPassword}','${accountid[4]}','${location}');`,
    () => mydebugger({ message: 'Created some distributors' }));
  client.release();
};

createDistributors();
