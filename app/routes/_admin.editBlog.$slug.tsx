import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { MetaFunction, useLoaderData } from "react-router";

export const meta: MetaFunction = () => [
  // your meta here
  {
    title: "Edit Blog",
  },
];

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  console.log("🚀 ~ loader ~ params:", params);
  console.log("🚀 ~ loader ~ request:", request.body);
  return params.slug;
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  console.log("🚀 ~ action ~ params:", params);
  console.log("🚀 ~ action ~ request:", request);
  return null;
};

export default function RouteComponent() {
  const data = useLoaderData<typeof loader>();
  return <div>{data}</div>;
}
