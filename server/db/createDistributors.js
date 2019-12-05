import debuggerconsole from 'debug';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import pool from './config';

dotenv.config();
const mydebugger = debuggerconsole('app:startup');


const createDistributors = async () => {
  const name = process.env.DISTR_NAME.split(',');
  const logourl = process.env.DISTR_LOGO_URL.split(',');
  const userid = process.env.DISTR_USERID.split(',');
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(process.env.DISTR_PASSWORD, salt);
  const client = await pool.connect();
  mydebugger(logourl);
  await client
    .query(`INSERT INTO distributors ( name, logourl, userid, password)
    VALUES ('${name[0]}','${logourl[0]}', '${userid[0]}', '${hashedPassword}'),
    ('${name[1]}','${logourl[1]}', '${userid[1]}', '${hashedPassword}'),
    ('${name[2]}','${logourl[2]}', '${userid[2]}', '${hashedPassword}'),
    ('${name[3]}','${logourl[3]}', '${userid[3]}', '${hashedPassword}'),
    ('${name[4]}','${logourl[4]}', '${userid[4]}', '${hashedPassword}');`,
    () => mydebugger({ message: 'Created an some distributors' }));
  client.release();
};

createDistributors();
