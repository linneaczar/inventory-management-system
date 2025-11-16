import pg from "pg";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const { Pool } = pg;

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD
});

export default pool;