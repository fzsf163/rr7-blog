// app/services/auth.server.ts
import argon2 from "argon2";
import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "~/utils/session.server";
import FindOrCreateUser from "./login";
// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export type User = {
  userID: string;
};

export const authenticator = new Authenticator<User | null>(sessionStorage);
// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    // let user = await login(email, password);
    let user = null;
    // the type of this user must match the type you pass to the Authenticator
    // the strategy will automatically inherit the type if you instantiate
    // directly inside the `use` method
    // You can validate the inputs however you want
    if (!email || email?.length === 0)
      throw new AuthorizationError("Bad Email");

    if (!password || password?.length < 0)
      throw new AuthorizationError("Password is required");

    const hashPass = await argon2.hash(password).then((value) => {
      return value;
    });

    const getUser = await FindOrCreateUser(email, hashPass);

    const verify = await argon2
      .verify(getUser.password!, password)
      .then((value) => {
        return value;
      });

    if (verify === true) {
      const id = getUser?.userID;
      user = { userID: id };
    } else {
      throw new AuthorizationError("Bad Credentials");
    }
    return user;
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass",
);
