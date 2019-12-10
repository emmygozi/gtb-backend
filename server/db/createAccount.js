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
  const age = process.env.ACCT_AGE.split(',');
  const returnedchequecount = process.env.ACCT_returnedchequecount.split(',');
  const taxid = process.env.ACCT_taxid.split(',');
  const minmonthlodgement = process.env.ACCT_minmonthlodgement.split(',');
  const minqtlodgement = process.env.ACCT_minqtlodgement.split(',');
  const classificationname = process.env.ACCT_classificationname.split(',');
  const yearlyturnover = process.env.ACCT_yearlyturnover.split(',');
  const client = await pool.connect();
  await client

    .query(`INSERT INTO account ( accountno, accountname, bvn, accountbalance, averageinflow, averageoutflow, age, returnedchequecount, taxid, minmonthlodgement, minqtlodgement, classificationname, yearlyturnover)
    VALUES ('${accountno[0]}','${accountname[0]}', '${bvn[0]}', '${accountbalance[0]}', '${averageinflow[0]}', '${averageoutflow[0]}', '${age[0]}', '${returnedchequecount[0]}', '${taxid[0]}','${minmonthlodgement[0]}', '${minqtlodgement[0]}', '${classificationname[0]}', '${yearlyturnover[0]}'),
    ('${accountno[1]}','${accountname[1]}', '${bvn[1]}', '${accountbalance[1]}','${averageinflow[1]}', '${averageoutflow[1]}','${age[1]}', '${returnedchequecount[1]}', '${taxid[1]}','${minmonthlodgement[1]}', '${minqtlodgement[1]}', '${classificationname[1]}', '${yearlyturnover[1]}'),
    ('${accountno[2]}','${accountname[2]}', '${bvn[2]}', '${accountbalance[2]}','${averageinflow[2]}', '${averageoutflow[2]}','${age[2]}', '${returnedchequecount[2]}', '${taxid[2]}','${minmonthlodgement[2]}', '${minqtlodgement[2]}', '${classificationname[2]}', '${yearlyturnover[2]}'),
    ('${accountno[3]}','${accountname[3]}', '${bvn[3]}', '${accountbalance[3]}','${averageinflow[3]}', '${averageoutflow[3]}','${age[3]}', '${returnedchequecount[3]}', '${taxid[3]}','${minmonthlodgement[3]}', '${minqtlodgement[3]}', '${classificationname[3]}', '${yearlyturnover[3]}'),
    ('${accountno[4]}','${accountname[4]}', '${bvn[4]}', '${accountbalance[4]}','${averageinflow[4]}', '${averageoutflow[4]}','${age[4]}', '${returnedchequecount[4]}', '${taxid[4]}','${minmonthlodgement[4]}', '${minqtlodgement[4]}', '${classificationname[4]}', '${yearlyturnover[4]}'),
    ('${accountno[5]}','${accountname[5]}', '${bvn[5]}', '${accountbalance[5]}','${averageinflow[5]}', '${averageoutflow[5]}','${age[5]}', '${returnedchequecount[5]}', '${taxid[5]}','${minmonthlodgement[5]}', '${minqtlodgement[5]}', '${classificationname[5]}', '${yearlyturnover[5]}'),
    ('${accountno[6]}','${accountname[6]}', '${bvn[6]}', '${accountbalance[6]}','${averageinflow[6]}', '${averageoutflow[6]}','${age[6]}', '${returnedchequecount[6]}', '${taxid[6]}','${minmonthlodgement[6]}', '${minqtlodgement[6]}', '${classificationname[6]}', '${yearlyturnover[6]}');`,
    () => mydebugger({ message: 'Created some accounts' }));
  client.release();
};

createAccount();
