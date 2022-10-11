import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * @Module UserController
 * @description Controlls all the user based activity
 */
/**
 * @static
 * @description Returns message based on the status
 * @param {Object} res - Response object
 * @param {Number} status - Appropraite error status
 * @param {String} error - The appropriate error message
 * @returns {Object} res object to report approprate error
 * @memberof Helper
 */
export const errorStat = (res, status, error) => {
  return res.status(status).json({ status, error });
};

/**
 * @static
 * @description Returns message based on the status
 * @param {Object} res - Response object
 * @param {integer} status - status code to be sent
 * @param {String} key - the output data key
 * @param {Object} value - the output data values
 * @returns {Object} res object to report the appropraite message
 * @memberof Helper
 */
export const successStat = (res, status, key, value) => {
  return res.status(status).json({ status, [key]: value });
};

/**
 * @static
 * @description It encrypts user password before storing in database
 * @param {String} password - Password to be hashed
 * @returns {String} Encrypted password
 * @memberof Helper
 */
export const hashPassword = async (password) => {
  try {
    const result = await bcrypt.hash(password, 6);
    return result;
  } catch (err) {
    throw new Error("Hash password failed");
  }
};

/**
 * @static
 * @description It decrypts user password
 * @param {String} password - Request object
 * @param {String} hashed - Response object
 * @returns {Boolean} Returns true if the password is correct
 * @memberof Helper
 */
export const comparePassword = async (password, hashed) => {
  try {
    const result = await bcrypt.compareSync(password, hashed);
    return result;
  } catch (err) {
    throw new Error("Hash password failed");
  }
};

/**
 * @description Generates a jwt token
 * @param {Object} payload - Details to encode in the token
 * @returns {string} Generated token
 * @memberof Auth
 */
export const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.APP_SECRET);
  return token;
};

/**
 * @description Verify a jwt token
 * @param {Object} token - Token to be verified
 *  @param {function} callBack - call back method to jwt
 * @returns {Object} verified token
 * @memberof Auth
 */
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.APP_SECRET);
};
