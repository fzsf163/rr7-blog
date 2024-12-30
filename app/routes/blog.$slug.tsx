import { ClientOnly } from "remix-utils/client-only";
import BlogView from "~/components/blog/blog_view";
import { BlogViewType } from "~/types/blog_view_type";
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

export default function SingleBlog({ loaderData }: Route.ComponentProps) {
  const post = loaderData as BlogViewType;
  return (
    <div className="mx-auto w-[80%]">
      <ClientOnly>{() => <BlogView post={post}></BlogView>}</ClientOnly>
    </div>
  );
}
