import { IconArrowRight } from "@tabler/icons-react";
import { Link } from "react-router";
import SelectGroup from "~/components/serachbox/multi_select";
import SearchModal from "~/components/serachbox/search-box";
import { db } from "~/utils/db.server";
import { ErrorHandler } from "~/utils/error_Handler";
import type { Route } from "./+types/blogs.$category";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const category = params.categories ?? "All";
  console.log("🚀 --------------------------------🚀")
  console.log("🚀 ~ loader ~ category:", category)
  console.log("🚀 --------------------------------🚀")
  try {
    if (category === "All") {
      const blogs = await db.post.findMany({
        where: {
          published: true,
        },
        select: {
          author: {
            select: {
              name: true,
            },
          },
          category: true,
          updatedAt: true,
          thumbnail: true,
          title: true,
          tags: true,
          id: true,
          readTime: true,
          synopsis: true,
        },
      });
      return { staus: 200, statusText: "Success", data: blogs };
    }
    if (category !== "All") {
      const blogs = await db.post.findMany({
        where: {
          category: {
            mode: "insensitive",
            contains: category,
          },
        },
        select: {
          author: {
            select: {
              name: true,
            },
          },
          category: true,
          updatedAt: true,
          thumbnail: true,
          title: true,
          tags: true,
          id: true,
          readTime: true,
          synopsis: true,
        },
      });
      return { staus: 200, statusText: "Success", data: blogs };
    }
  } catch (error) {
    const e = ErrorHandler.handleError(error);
    return {
      staus: e.status,
      statusText: e.statusText,
    };
  }
};

export const action = async () => {
  return "ok";
};

export default function RouteComponent({ loaderData }: Route.ComponentProps) {
  const blogs = loaderData?.data ?? [];
  if (blogs.length <= 0)
    return (
      <div className="min-h-screen pt-5 text-center text-5xl">
        Ops No blog found In that Category!!!🥲😭😖 <br /> Go Back to{" "}
        <span className="cursor-pointer text-blue-600">
          <Link to={"/blogcollection"}>Blogs</Link>
        </span>
      </div>
    );
  return (
    <div className="relative m-auto mt-2 max-w-screen-2xl space-y-5 capitalize">
      <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
        <SelectGroup></SelectGroup>
        <SearchModal></SearchModal>
      </div>
      <title>Blogs</title>
      {/* sapce-x-10 xl:colums-4 columns-1 gap-3 sm:columns-2 lg:columns-3 2xl:columns-4 */}
      <div className="grid min-h-screen grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-10 sm:px-5">
        {blogs.map((b) => {
          return (
            <div key={b.id}>
              <div>
                <div className="group relative mb-4 flex min-h-[400px] w-fit max-w-[24rem] flex-col items-center justify-center rounded-lg text-white 2xl:w-fit">
                  <div className="absolute left-0 top-0 z-10 flex h-fit min-w-full flex-col items-start text-wrap break-words rounded-lg rounded-b-none bg-slate-700/60 p-4 text-sm font-semibold backdrop-blur-sm sm:text-base xl:text-xl">
                    <span className="text-sm font-medium text-foreground-300 sm:text-medium">
                      {b.category}
                    </span>
                    {b.title}
                  </div>
                  <div className="aspect-auto w-fit overflow-hidden rounded-lg">
                    <img
                      src={b.thumbnail}
                      className="min-h-[20rem] w-full rounded-lg p-0 transition-transform duration-700 ease-soft-spring group-hover:scale-110 xl:h-full"
                      alt=""
                    ></img>
                  </div>
                  <Link to={`/blog/${b.id}`}>
                    <button className="absolute bottom-0 left-0 z-10 flex w-full items-center justify-center gap-2 rounded-lg rounded-t-none bg-slate-700/60 py-4 text-lg backdrop-blur-sm transition-colors duration-250 ease-in-out hover:text-blue-200">
                      Read More{" "}
                      <span>
                        <IconArrowRight strokeWidth={2}></IconArrowRight>
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
