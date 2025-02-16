import { Spinner } from "@heroui/react";
import { useFetcher, useLoaderData } from "react-router";
import { ClientOnly } from "remix-utils/client-only";
import CategoriesTabTop from "~/components/categories-blog-page/tabs";
import SearchBox from "~/components/serachbox/searchbox";
import type { Route } from "./+types/blogs";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const s = url.searchParams.get("category");
  if (s) {
    return s;
  }
  return null;
};

export const action = async () => {
  return "ok";
};

export default function RouteComponent() {
  const fetcher = useFetcher();
  const data = fetcher.data;
  const loaderdata = useLoaderData<typeof loader>();

  return (
    <div className="max-w-screen-3xl relative m-auto mt-2 space-y-5 capitalize">
      <fetcher.Form method="get" action="/api/search">
        <SearchBox fetcher={fetcher} data={data}></SearchBox>
      </fetcher.Form>

      <ClientOnly
        fallback={
          <Spinner
            label="Loading...reload page if nothing happens"
            color="warning"
            size="lg"
            className="flex items-center justify-center"
            classNames={{
              label: "font-bold",
            }}
          />
        }
      >
        {() => <CategoriesTabTop searchTerm={loaderdata}></CategoriesTabTop>}
      </ClientOnly>
    </div>
  );
}
