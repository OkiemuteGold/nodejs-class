import pool from "../configs.js";
const userTable = ` CREATE TABLE IF NOT EXISTS users(
    id serial PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text unique NOT NULL,
    password text NOT NULL,
    address text NOT NULL,
    is_admin boolean NOT NULL
);
`;
const createTable = async () => {
  const create = `${userTable}`;
  try {
    await pool.query(create);
    console.log("Tables Successful created Tables");
  } catch (error) {
    console.log(error);
  }
};

createTable();
