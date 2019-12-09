import debuggerconsole from 'debug';
import dotenv from 'dotenv';
import pool from './config';

dotenv.config();
const mydebugger = debuggerconsole('app:startup');

const createAccount = async () => {
  const accountno = process.env.ACCT_NAME.split(',');
  const accountname = process.env.ACCT_NO.split(',');
  const bvn = process.env.BVN.split(',');
  const accountbalance = process.env.ACCT_BAL.split(',');
  const averageinflow = process.env.AVGINFLOW.split(',');
  const averageoutflow = process.env.AVGOUTFLOW.split(',');
  const client = await pool.connect();
  await client

    .query(`INSERT INTO account ( accountno, accountname, bvn, accountbalance, averageinflow, averageoutflow)
    VALUES ('${accountno[0]}','${accountname[0]}', '${bvn[0]}', '${accountbalance}', '${averageinflow}', '${averageoutflow}'),
    ('${accountno[1]}','${accountname[1]}', '${bvn[1]}', '${accountbalance}','${averageinflow}', '${averageoutflow}'),
    ('${accountno[2]}','${accountname[2]}', '${bvn[2]}', '${accountbalance}','${averageinflow}', '${averageoutflow}'),
    ('${accountno[3]}','${accountname[3]}', '${bvn[3]}', '${accountbalance}','${averageinflow}', '${averageoutflow}'),
    ('${accountno[4]}','${accountname[4]}', '${bvn[4]}', '${accountbalance}','${averageinflow}', '${averageoutflow}');`,
    () => mydebugger({ message: 'Created some accounts' }));
  client.release();
};

createAccount();
