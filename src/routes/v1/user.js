import express from "express";
import { login, signup } from "../../controllers/user.js";
import {
  signUpSchema,
  loginSchema,
  validate,
} from "../../middlewares/index.js";

const userRoutes = express();

userRoutes.post("/signup", validate(signUpSchema), signup);
userRoutes.post("/login", validate(loginSchema), login);
export default userRoutes;
