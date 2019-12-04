import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const myDatabaseConfig = {
  database: process.env.LOCAL_DB_NAME,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

// optimize if else code with tenary shortcut
const pool = (process.env.NODE_ENV === 'production') ? new Pool(process.env.DATABASE_URL) : new Pool(myDatabaseConfig);

export default pool;
