import { Request, Response, NextFunction } from "express";
import passport from "passport";
import User, { ZUser } from "../model/userModel";
import { CustomError } from "../utils/errorFn";

export const registerFn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userData = await ZUser.parseAsync(req.body);

  const user = await User.create(userData);

  req.logIn(user, function (err) {
    if (err) {
      return res.json({ status: false, message: "Authentication Failed" });
    }

    res.json({ status: true, message: "Registration Successfull" });
  });
};

export const loginDataValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ZAuth = ZUser.omit({ name: true, role: true });

  const authData = await ZAuth.safeParseAsync(req.body);

  if (authData.success) {
    next();
  } else {
    throw new CustomError("Invalid credentials", 404);
  }
};

export const loginFn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("local", function (err: any, user: any, info: any) {
    if (err) return next(err);

    if (!user) return res.json({ status: false, message: info.message });

    req.logIn(user, function (err) {
      if (err) return next(err);

      return res.json({ status: true, message: "Login Successfull" });
    });
  })(req, res, next);
};

export const logoutFn = async (req: Request, res: Response) => {
  req.logOut(function (err) {
    if (err) {
      return res.json({ status: false, message: "Logout Failed" });
    }
    res.json({ status: true, message: "Logout Succcessfully" });
  });
};

export const profileFn = async (req: Request, res: Response) => {
  const { userId } = req.user as { userId: string };
  const user = await User.findById(userId);

  if (!user) {
    res.status(404).json({ status: false, message: "User Not Found" });
    return;
  }

  res.json({ status: true, user });
};
