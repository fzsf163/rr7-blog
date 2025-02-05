import { Spinner } from "@heroui/react";
import { ClientOnly } from "remix-utils/client-only";
import BlogView from "~/components/blog/blog_view";
import { BlogViewType } from "~/types/blog_view_type";
import { PostData } from "~/types/post_data_type";
import { db } from "~/utils/db.server";
import type { Route } from "./+types/blog.$slug";

export const loader = async ({ params }: Route.LoaderArgs) => {
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
};
export function meta({ data }: Route.MetaArgs) {
  const post = data as unknown as PostData;
  return [
    { title: post.title },
    {
      property: `og:${post.title}`,
      content: post.synopsis,
    },
    {
      name: post.title,
      content: post.content,
    },
  ];
}

export default function SingleBlog({ loaderData }: Route.ComponentProps) {
  const post = loaderData as unknown as BlogViewType;
  return (
    <div className="mx-auto w-[80%]">
      <ClientOnly
        fallback={
          <div className="flex h-screen items-center justify-center">
            <Spinner size="lg" label="Loading Please wait..." />
          </div>
        }
      >
        {() => <BlogView post={post}></BlogView>}
      </ClientOnly>
      <div className="mt-10">
        <p className="text-xl font-semibold">Comments</p>
        <hr className="mb-2 h-1 bg-foreground-400" />
      </div>
    </div>
  );
}
