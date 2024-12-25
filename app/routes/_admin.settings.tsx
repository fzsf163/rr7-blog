import { Tooltip } from "@nextui-org/react";
import { IconPlus, IconTrashFilled } from "@tabler/icons-react";
import argon2 from "argon2";
import { useEffect, useState } from "react";
import type { ActionFunctionArgs } from "react-router";
import { Form, Link } from "react-router";
import { toast } from "react-toastify";
import { authenticate } from "~/utils/authHelper.server";
import { db } from "~/utils/db.server";
// eslint-disable-next-line import/no-unresolved
import { Route } from "./+types/_admin.settings";
// import "../components/submitbutton/btn.css"
export async function loader({ request }: Route.LoaderArgs) {
  const userInfo = await db.user.findMany();
  const userID = await authenticate(request);
  const currentUser = userInfo.filter((u) => {
    if (u.id === userID) {
      return u;
    }
  });
  return { userInfo, currentUser };
}

export async function action({ request }: ActionFunctionArgs) {
  const formdata = await request.formData();
  const email = formdata.get("emailCurrent");
  const password = formdata.get("passwordUpdate");
  const newUserEmail = formdata.get("userAdderEmail");
  const newUserPassword = formdata.get("userAdderPassword");

  async function hashPass(pass: string) {
    const hashedPassword = await argon2.hash(pass as string).then((value) => {
      return value;
    });
    return hashedPassword;
  }
  if (email && password) {
    const pass = await hashPass(password as string).then((p) => {
      return p;
    });
    try {
      const user = await db.user.update({
        where: {
          email: String(email),
        },
        data: {
          password: pass,
        },
      });
      if (user) {
        return { success: "Password Updated" };
      }
    } catch (error) {
      if (error) {
        return { error: "Something Wrong Happened" };
      }
    }
  }
  if (newUserEmail && newUserPassword) {
    const pass = await hashPass(newUserPassword as string).then((p) => {
      return p;
    });
    try {
      const user = await db.user.create({
        data: {
          email: newUserEmail as string,
          password: pass,
        },
      });
      if (user) {
        return { success: "New User Created" };
      }
    } catch (error) {
      if (error) {
        return { error: "Something Wrong Happened" };
      }
    }
    return null;
  }
  return null;
}

export default function Settings({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const currentUser = loaderData.currentUser.at(0);
  const users = loaderData.userInfo;
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [newUserEmail, setnewUserEmail] = useState("");
  const [newUserPassword, setnewUserPassword] = useState("");

  useEffect(() => {
    if (actionData === undefined) return;
    if (actionData?.success) {
      toast.success(actionData.success);
    }
    if (actionData?.error) {
      toast.error(actionData.error);
    }
  }, [actionData]);

  return (
    <div className="mx-auto w-[70%] space-y-5 py-5">
      <h1 className="text-4xl font-bold">Settings</h1>
      <p className="text-sm italic text-gray-400">
        Other details are edited in the{" "}
        <Link to={"/admin/aboutoptions"} className="not-italic text-blue-400">
          About
        </Link>{" "}
        page
      </p>
      <div className="space-y-4">
        <p className="text-xl font-medium text-gray-400">
          Change User email and password
        </p>
        <Form className="space-y-4" method="post">
          <div className="flex flex-col items-start gap-1">
            <label
              htmlFor="emailCurrent"
              className="text-lg font-bold text-gray-500"
            >
              Current Email{" "}
              <span className="text-sm text-gray-400">Not Editable</span>
            </label>
            <input
              type="email"
              name="emailCurrent"
              readOnly
              value={currentUser?.email ?? ""}
              id="emailCurrent"
              className="w-full rounded bg-neutral-300 px-3 py-2 text-lg font-semibold shadow"
            />
          </div>
          <div className="flex flex-col items-start gap-1">
            <label
              htmlFor="passwordUpdate"
              className="text-lg font-bold text-gray-500"
            >
              Update Password
            </label>
            <input
              placeholder="Password"
              type="password"
              name="passwordUpdate"
              value={password}
              onChange={(v) => setpassword(v.currentTarget.value)}
              id="passwordUpdate"
              className="w-full rounded bg-neutral-300 px-3 py-2 text-lg font-semibold shadow placeholder:text-gray-400"
              required
            />
          </div>
          <div className="flex flex-col items-start gap-1">
            <label
              htmlFor="passwordConfirm"
              className="text-lg font-bold text-gray-500"
            >
              Confirm Password
            </label>
            <input
              placeholder="Confirm Password"
              type="password"
              name="passwordConfirm"
              value={confirmPassword}
              onChange={(v) => setconfirmPassword(v.currentTarget.value)}
              id="passwordConfirm"
              className="w-full rounded bg-neutral-300 px-3 py-2 text-lg font-semibold shadow placeholder:text-gray-400"
              required
            />
          </div>
          {password !== confirmPassword && <p>Password does not match</p>}

          <button
            disabled={password === confirmPassword ? false : true}
            className="submit-button disabled:cursor-not-allowed disabled:opacity-20"
            type="submit"
          >
            Submit
          </button>
        </Form>
      </div>
      <br />
      <div className="space-y-4">
        <p className="text-xl font-medium text-gray-400">Add more users</p>
        <div>
          <Form method="post" className="space-y-4">
            <div className="flex flex-col items-start gap-2">
              <label
                htmlFor="userAdderEmail"
                className="text-lg font-bold text-gray-500"
              >
                Email
              </label>
              <Tooltip content="Enter New User Email">
                <input
                  placeholder="Email"
                  type="email"
                  name="userAdderEmail"
                  value={newUserEmail}
                  onChange={(v) => setnewUserEmail(v.currentTarget.value)}
                  id="userAdderEmail"
                  className="w-full rounded bg-neutral-300 px-3 py-2 text-lg font-semibold shadow placeholder:text-gray-400"
                  required
                  autoComplete="true"
                />
              </Tooltip>
            </div>
            <div className="flex flex-col items-start gap-2">
              <label
                htmlFor="userAdderPassword"
                className="text-lg font-bold text-gray-500"
              >
                Password
              </label>
              <Tooltip content="Enter New User Password">
                <input
                  placeholder="Password"
                  type="password"
                  name="userAdderPassword"
                  id="userAdderPassword"
                  value={newUserPassword}
                  onChange={(v) => setnewUserPassword(v.currentTarget.value)}
                  className="w-full rounded bg-neutral-300 px-3 py-2 text-lg font-semibold shadow placeholder:text-gray-400"
                  required
                />
              </Tooltip>
            </div>

            <Tooltip content="Add User">
              {/* <Button
                type="submit"
                color="primary"
                radius="none"
                className="rounded"
              >
                <IconPlus stroke={3}></IconPlus>
              </Button> */}
              <button className="submit-button" type="submit">
                <IconPlus stroke={3} className=""></IconPlus>
              </button>
            </Tooltip>
          </Form>
        </div>
      </div>
      <br />
      <div className="w-full space-y-6">
        <p className="text-xl font-medium text-slate-400">Current Users</p>
        <div className="rounded-sm bg-neutral-300 py-10 font-semibold">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left text-xl font-semibold capitalize">
                <th className="border-b-1 border-rose-200 pb-2 pl-5">Email</th>
                <th className="border-b-1 border-rose-200 pb-2">Password</th>
                <th className="border-b-1 border-rose-200 pb-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => {
                return (
                  <tr
                    key={i}
                    className="text-lg font-semibold text-gray-500 [&_td]:bg-neutral-300"
                  >
                    <td className="border-b-1 border-rose-200 p-4 pl-5 text-left">
                      {u.email}
                    </td>
                    <td className="border-b-1 border-rose-200 p-4 pl-0">
                      {u.password ? (
                        <div className="flex w-fit items-center justify-center gap-1">
                          <p className="size-2 rounded-full bg-slate-600"></p>
                          <p className="size-2 rounded-full bg-slate-600"></p>
                          <p className="size-2 rounded-full bg-slate-600"></p>
                          <p className="size-2 rounded-full bg-slate-600"></p>
                          <p className="size-2 rounded-full bg-slate-600"></p>
                          <p className="size-2 rounded-full bg-slate-600"></p>
                        </div>
                      ) : (
                        ""
                      )}
                    </td>
                    <td className="cursor-pointer border-b-1 border-rose-200 p-4">
                      <Tooltip content="Delete User">
                        <IconTrashFilled></IconTrashFilled>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <br />
    </div>
  );
}

// export function ErrorBoundary({ error }: { error: Error }) {
//   console.log("🚀 ~ ErrorBoundary ~ error:", error?.cause)
//   return (
//     <div>
//       <h1>Error</h1>
//       <p>{error?.message}</p>
//       <p>The stack trace is:</p>
//       <pre>{error?.stack}</pre>
//     </div>
//   );
// }

// export function ErrorBoundary() {
//   const error = useRouteError();
//   const refError = ReferenceError();

//   if (isRouteErrorResponse(error)) {
//     return (
//       <div>
//         <p>From Settings Page</p>
//         {error.data} {error.status} {error.statusText}
//       </div>
//     );
//   }
//   if (refError) {
//     return (
//       <div>
//         {refError.name}
//         <hr />
//         {refError.stack} <br />
//         {refError?.message}
//         {refError.cause as string}
//       </div>
//     );
//   }
//   return <div>Better Call Saul</div>;
// }
