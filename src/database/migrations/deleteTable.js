import pool from "../configs.js";

async function deleteTable() {
  try {
    await pool.query("DROP TABLE users");
    console.log("Tables Successful deleted");
  } catch (error) {
    console.log(error);
    console.log("Error deleting Tables");
  }
}

deleteTable();
