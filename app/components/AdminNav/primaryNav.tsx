import { Tooltip } from "@nextui-org/react";
import { IconLogout } from "@tabler/icons-react";
import { Form } from "react-router";
import ThemeToggler from "../themeSwitch";
import Sidenav from "./sidenav";
export default function PrimaryNav() {
  return (
    <div className="sticky top-0 z-50 flex h-[4rem] items-center justify-around gap-4 bg-white/30 backdrop-blur-sm dark:bg-neutral-600/10">
      <div>
        <Sidenav></Sidenav>
      </div>
      <h1 className="font-bold text-slate-600 dark:text-slate-200 sm:text-2xl">
        Admin Panel
      </h1>
      <div className="flex items-center justify-center gap-4">
        <ThemeToggler></ThemeToggler>
        <Form method="POST" action="/auth" reloadDocument>
          <Tooltip content="Logout">
            <button
              type="submit"
              name="intent"
              value="logout"
              className="rounded-md bg-blue-600 p-2 text-white"
            >
              <IconLogout stroke={2} className="size-4" />
            </button>
          </Tooltip>
        </Form>
      </div>
    </div>
  );
}
