import { data, Outlet } from "react-router";
import PrimaryNav from "~/components/AdminNav/primaryNav";
import { authenticate } from "~/utils/authHelper.server";
import type { Route } from "../+types/root";
import "../components/submitbutton/btn.css";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const userId = await authenticate(request);
  return data(userId);
};

export default function Admin() {
  return (
    <div style={{ fontFamily: "K2D, sans-serif" }}>
      <PrimaryNav></PrimaryNav>
      <Outlet></Outlet>
    </div>
  );
}
