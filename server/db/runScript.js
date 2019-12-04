import debuggerconsole from 'debug';
import pool from './config';
import dropAndCreateTablesScript from './databaseScript';

const mydebugger = debuggerconsole('app:startup');


const dropAndRecreateTables = async () => {
  const client = await pool.connect();
  await client.query(dropAndCreateTablesScript, () => mydebugger({ message: 'Dropped and Recreated all tables' }));
  client.release();
};

dropAndRecreateTables();
