import { redirect } from "react-router";
import { authenticator } from "~/utils/auth.server";
import { authenticate } from "~/utils/authHelper.server";
import {
  destroySession,
  getSession
} from "~/utils/session.server";
import "../components/submitbutton/btn.css";
import type { Route } from "./+types/admin";

export const action = async ({ request }: Route.ActionArgs) => {
  const formdata = await request.formData();
  const intent = formdata.get("intent");
  const _session = await getSession(request.headers.get("Cookie"));
  if (intent === "logout") {
    await authenticator.logout(request, {
      redirectTo: "/",
      headers: {
        "Set-Cookie": await destroySession(_session),
      },
    });
  }
  return null;
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const userID = await authenticate(request);
  console.log("🚀 ~ loader ~ userID: admin", userID);
  if (userID) {
    return redirect("admin/dashboard");
  } else {
    return redirect("/");
  }
};
