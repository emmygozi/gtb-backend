import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const myDatabaseConfig = {
  database: 'd3bv9i666c0m7l',
  host: 'ec2-174-129-255-37.compute-1.amazonaws.com',
  user: 'kdeootgcdpkkxx',
  password: '4ee22406f9e72a39df497f96cd752efa5ebdf5c8dd5c1f3606f146d9c86d0497',
  port: 5432,
  ssl: true
};

// optimize if else code with tenary shortcut
const pool = (process.env.NODE_ENV === 'production') ? new Pool(process.env.DATABASE_URL) : new Pool(myDatabaseConfig);

export default pool;
