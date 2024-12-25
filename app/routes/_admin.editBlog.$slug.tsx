import { MetaFunction } from "react-router";
import type { Route } from "./+types/_admin.editBlog.$slug";

export const meta: MetaFunction = () => [
  // your meta here
  {
    title: "Edit Blog",
  },
];

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  console.log("🚀 ~ loader ~ request:", request);
  return params.slug;
};

export const action = async ({ request, params }: Route.ActionArgs) => {
  return { request, params };
};

export default function RouteComponent({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  console.log("🚀 ~ actionData:", actionData?.params, actionData?.request);
  const data = loaderData;
  return <div>{data}</div>;
}
