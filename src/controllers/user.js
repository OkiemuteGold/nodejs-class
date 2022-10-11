import {
  generateToken,
  successStat,
  errorStat,
  comparePassword,
  hashPassword,
} from "../helpers/index.js";

import { createUser, findUser } from "../database/index.js";
/**
 * @description Allows a user to sign up
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} object containing user data and access
 * @memberof UserController
 */
export const signup = async (req, res) => {
  const { first_name, last_name, email, password, address } = req.body;

  try {
    //  Finding the user in the DB
    const ExistingUser = await findUser(email);
    if (ExistingUser) return errorStat(res, 409, "User Already Exist");

    //Encrypting the user password
    const createdPassword = await hashPassword(password);

    const newUser = await createUser({
      first_name,
      last_name,
      email,
      password: createdPassword,
      address,
      is_admin: false,
    });
    // Creating access token
    const accessToken = generateToken({
      first_name,
      last_name,
      email,
      isAdmin: false,
    });
    const message = "Registration is successful ";
    return successStat(res, 201, "data", {
      message,
      accessToken,
      newUser: newUser.rows[0],
    });
  } catch (error) {
    console.log({ error });
    return errorStat(res, 500, "Server error");
  }
};

/**
 * @param {String} password - Password to be hashed
 * @description Allows a user to sign in
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} object containing user data and access  * @memberof UserController
 */
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUser(email);
    if (!user) return errorStat(res, 403, "Incorrect Login information");

    const matchPasswords = await comparePassword(password, user.password);

    if (!matchPasswords)
      return errorStat(res, 403, "Incorrect Login information");

    const accessToken = generateToken({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      isAdmin: user.isAdmin,
    });

    const message = "Login successful";

    return successStat(res, 200, "data", {
      user,
      accessToken,
      message,
    });
  } catch (error) {
    console.log({ email, password }, error);
    return errorStat(res, 500, "Server error");
  }
};
