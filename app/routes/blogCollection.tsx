import { Outlet, type LoaderFunctionArgs } from "react-router";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  console.log("🚀 ~ loader ~ params:", params);
  //   console.log("🚀 ~ loader ~ request:", request.body);
  // const url = new URL(request.url);
  // const id = url.searchParams.get("query");
  // console.log("🚀 ~ loader ~ id:", id)
  return true;
};

export default function BlogCollection() {
  return (
    <div>
      <h1>Normal BlogCollection</h1>
      <Outlet></Outlet>
    </div>
  );
}
