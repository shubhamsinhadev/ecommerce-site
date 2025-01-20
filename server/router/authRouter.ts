import express from "express";
import wrap from "../utils/wrap";
import "../utils/passport";

import {
  loginFn,
  logoutFn,
  profileFn,
  registerFn,
} from "../controller/authController";
import isAuthenticated from "../utils/isAuthenticated";

const authRouter = express.Router();

authRouter.post("/register", wrap(registerFn));

authRouter.post("/login", wrap(loginFn));

authRouter.post("/logout", wrap(logoutFn));

authRouter.post("/profile", isAuthenticated, wrap(profileFn));

export default authRouter;
