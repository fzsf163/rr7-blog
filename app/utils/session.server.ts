// app/services/session.server.ts
import { createCookieSessionStorage, redirect } from "react-router";
// const isProduction = process.env.NODE_ENV === "production";
const s = process.env.SESSION_SECRET;

// export the whole sessionStorage object
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session", // use any name you want here
    maxAge: 60 * 60 * 24,
    sameSite: "lax", // this helps with CSRF
    path: "/", // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: [s!], // replace this with an actual secret
    // ...(isProduction
    //   ? { domain: "your-production-domain.com", secure: true }
    //   : {}),
    // enable this in prod only
  },
});

// you can also export the methods individually for your own usage
export const { getSession, commitSession, destroySession } = sessionStorage;

export async function requireUserSession(request: Request) {
  // get the session
  const session = await getSession(request.headers.get("cookie"));
  console.log("🚀 ~ requireUserSession ~ session:", session.data);

  // validate the session, `userId` is just an example, use whatever value you
  // put in the session when the user authenticated
  const user = session.get("userId");
  console.log("🚀 ~ requireUserSession ~ user:", user);
  // redirect to home. user must know login route
  if (!user) {
    return redirect("/");
  }
  // if (!session.has("user")) {
  //   // if there is no user session, redirect to login
  //   throw redirect("/admin");
  // }

  return user;
}
