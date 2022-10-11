import pool from "./configs.js";

export const createUser = async ({
  first_name,
  last_name,
  password,
  address,
  is_admin,
  email,
}) => {
  const result = await pool.query(
    "INSERT INTO users (first_name, last_name, password, address, is_admin, email) VALUES ($1, $2,$3,$4,$5,$6) RETURNING *",
    [first_name, last_name, password, address, is_admin, email]
  );

  return result;
};

export const findUser = async (email) => {
  const result = await pool.query("SELECT* from users where email = $1", [
    email,
  ]);
  return result.rows[0];
};

// export const getUserById = (request, response) => {
//   const id = parseInt(request.params.id);

//   pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).json(results.rows);
//   });
// };

// export const getUsers = (request, response) => {
//   pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).json(results.rows);
//   });
// };

// export const deleteUser = (request, response) => {
//   const id = parseInt(request.params.id);

//   pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).send(`User deleted with ID: ${id}`);
//   });
// };

// export const updateUser = (request, response) => {
//   const id = parseInt(request.params.id);
//   const { name, email } = request.body;

//   pool.query(
//     "UPDATE users SET name = $1, email = $2 WHERE id = $3",
//     [name, email, id],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       response.status(200).send(`User modified with ID: ${id}`);
//     }
//   );
// };
