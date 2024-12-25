import { redirect } from "react-router";
import { sessionStorage } from "./session.server";

export async function authenticate(request: Request, returnTo?: string) {
  const session = await sessionStorage.getSession(
    request.headers.get("cookie"),
  );
  const user: Record<string, string> = session.get("userId");
  console.log("🚀 ~ authenticate ~ ", user.userID);
  if (user) return user.userID;
  if (returnTo) session.set("returnTo", returnTo);
  throw redirect("/login", {
    headers: { "Set-Cookie": await sessionStorage.commitSession(session) },
  });
}
