import {Pool} from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DATA_USER,
    host: process.env.DATA_HOST,
    database: process.env.DATA_NAME,
    password:  process.env.DATA_PASS,
    port: parseInt(process.env.DB_PORT || '5432')
});

export default pool;