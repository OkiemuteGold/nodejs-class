import { errorStat } from "../../helpers/index.js";

/**
 * @method validateUser
 * @description Validates user details on login
 * @param {object} schema - The Request Object
 *@param {function} cb - Optional object for transformation
 * @param {object} req - The Request Object
 * @param {object} res - The Response Object
 * @param {function} next - The next function to point to the next middleware
 * @returns {function} validate() - An execucted validate function
 *
 */

export const validate = (schema) => (req, res, next) => {
  let route = req.baseUrl.slice(8);
  route = route.substr(route.indexOf("/") + 1);

  const { error, value } = schema.validate(
    { ...req.body, ...req.params, ...req.query },
    { abortEarly: false }
  );

  if (error) {
    return errorStat(
      res,
      400,
      error.details.map((detail) => {
        const message = detail.message.replace(/"/gi, "");
        return message;
      })
    );
  }

  req.body[route] = value;
  return next();
};
