import dotenv from "dotenv";
import { Pool } from "pg";
dotenv.config();

export async function connection() {
  const pool = new Pool({
    user: process.env.PGSQL_USER,
    host: process.env.PGSQL_NAME,
    database: "postgres",
    password: process.env.PGSQL_PASSWORD,
    port: Number(process.env.PGSQL_PORT),
  });
  console.info("Connected to database");
  const client = await pool.connect();
  const res = await client.query("SELECT NOW()");
  console.info(res.rows[0]);
  client.release();
  return pool.connect();
}
