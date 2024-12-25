import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  console.log("🚀 ~ loader ~ params:", params);
  return params;
};

export default function SingleBlog() {
  const data = useLoaderData<typeof loader>();
  return <div>Single blog route {data.slug}</div>;
}
