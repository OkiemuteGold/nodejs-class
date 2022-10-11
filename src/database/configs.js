import pkg from "pg";
const { Pool } = pkg;

import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
});
export default pool;
