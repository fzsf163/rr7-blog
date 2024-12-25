import { useEffect } from "react";
import { Form, redirect } from "react-router";
import { toast } from "react-toastify";
import { AuthorizationError } from "remix-auth";
import LoginForm from "~/components/AdminLoginForm/loginForm";
import { authenticator } from "~/utils/auth.server";
import { authenticate } from "~/utils/authHelper.server";
import { commitSession, sessionStorage } from "~/utils/session.server";
import type { Route } from "./+types/_auth.login";

export default function LogIn({ actionData }: Route.ComponentProps) {
  const notify = (text: string) => toast.error(text);
  useEffect(() => {
    if (actionData !== null && actionData !== undefined) {
      if (typeof actionData === "object") {
        if (
          "success" in actionData &&
          typeof actionData.success === "string" &&
          actionData.success !== ""
        ) {
          // Handle the case where actionData has a success property
          notify(actionData.success);
        } else if (
          "authE" in actionData &&
          typeof actionData.authE === "string" &&
          actionData.authE !== ""
        ) {
          // Handle the case where actionData has an authE property
          notify(actionData.authE);
        } else if (
          "error" in actionData &&
          typeof actionData.error === "string" &&
          actionData.error !== ""
        ) {
          // Handle the case where actionData has an error property
          notify(actionData.error);
        }
      } else if (typeof actionData === "number") {
        // Handle the case where actionData is a status code
        notify(`Error: ${actionData}`);
      }
    }
  }, [actionData]);
  return (
    <div
      className="relative h-[100dvh]"
      style={{
        backgroundImage: 'url("/loginbg/rings.png")',
        backgroundPosition: "center center",
        backgroundSize: "100%",
      }}
    >
      {" "}
      <Form
        method="post"
        className="absolute bottom-0 left-0 right-0 top-60 m-auto"
      >
        <LoginForm></LoginForm>
      </Form>
    </div>
  );
}
// export async function action({ request }: Route.ActionArgs) {
//   // we call the method with the name of the strategy we want to use and the
//   // request object, optionally we pass an object with the URLs we want the user
//   // to be redirected to after a success or a failure
//   try {
//     await authenticator.authenticate("user-pass", request, {
//       successRedirect: "/admin/dashboard",
//       // failureRedirect: "/login",
//       throwOnError: true,
//     });
//     return { success: "Log In Success" };
//   } catch (error) {
//     if (error instanceof Response) {
//       console.log("🚀 ~ action ~ error:", error);
//       return error.status;
//     }

//     if (error instanceof AuthorizationError) {
//       console.log("🚀 ~ action ~ error:", error);
//       // here the error is related to the authentication process
//       return { authE: error.message };
//     }
//   }
//   return null;
// }

export async function action({ request }: Route.ActionArgs) {
  try {
    const userId = await authenticator.authenticate("user-pass", request);
    const session = await sessionStorage.getSession(
      request.headers.get("cookie"),
    );
    session.set("userId", userId);
    const headers = new Headers({ "Set-Cookie": await commitSession(session) });
    // If the response is a redirection, return it
    if (userId?.userID) {
      return redirect("/admin/dashboard", { headers });
    }
    // if ((response as Response).status === 302) {
    //   return redirect((response as Response).headers.get("location")!);
    // }

    return userId;
  } catch (error) {
    if (error instanceof Response) {
      return Response.json({ error: error.type }, { status: error.status });
    }

    if (error instanceof AuthorizationError) {
      return Response.json({ authE: error.message }, { status: 401 });
    }

    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}

// Finally, we can export a loader function where we check if the user is
// authenticated with `authenticator.isAuthenticated` and redirect to the
// dashboard if it is or return null if it's not
export async function loader({ request }: Route.LoaderArgs) {
  // If the user is already authenticated redirect to /dashboard directly
  const userID = await authenticate(request, "/admin/dashboard");
  await authenticator.isAuthenticated(request);
  if (userID) {
    return redirect("/admin/dashboard");
  }
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );

  const error = session.get("error");

  return Response.json(
    { error },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session), // You must commit the session whenever you read a flash
      },
    },
  );
}
