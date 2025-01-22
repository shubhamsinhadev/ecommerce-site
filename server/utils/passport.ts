import passport from "passport";
import passportLocal from "passport-local";
import User, { ZUser } from "../model/userModel";

const LocalStrategy = passportLocal.Strategy;

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async function (email, password, done) {
      const ZAuth = ZUser.omit({ name: true, role: true });

      const authData = await ZAuth.safeParseAsync({ email, password });

      if (authData.error)
        return done(null, false, { message: "Credentials Invalid " });

      const userData = authData.data;

      const user = await User.findOne({ email: userData.email }).select(
        "password"
      );

      if (!user) return done(null, false, { message: "User not found" });

      const isMatch = await user.comparePassword(password);

      if (!isMatch) return done(null, false, { message: "Password incorrect" });

      return done(null, user);
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: any, done) => {
  done(null, { userId: id });
});
