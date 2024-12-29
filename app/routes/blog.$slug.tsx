import { Spinner } from "@nextui-org/react";
import { Suspense } from "react";
import { Await } from "react-router";
import BlogView from "~/components/blog/blog_view";
import { BlogViewType } from "~/types/blog_view_type";
import { db } from "~/utils/db.server";
import type { Route } from "./+types/blog.$slug";

export const loader = async ({ params }: Route.LoaderArgs) => {
  console.log("🚀 ~ loader ~ params:", params.slug);
  try {
    const post = await db.post.findUnique({
      where: {
        id: params.slug,
      },
      include: {
        author: {
          select: {
            name: true,
            shortbio: true,
            title: true,
          },
        },
      },
    });
    return post;
  } catch (error) {
    return {
      error: error,
    };
  }
  return params;
};

export default function SingleBlog({ loaderData }: Route.ComponentProps) {
  const post = loaderData as BlogViewType;
  return (
    <div className="mx-auto w-[80%]">
      <Suspense fallback={<Spinner />}>
        <Await resolve={post}>
          {(value) => <BlogView post={value}></BlogView>}
        </Await>
      </Suspense>
    </div>
  );
}
