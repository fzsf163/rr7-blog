/* eslint-disable import/no-unresolved */
import CustomCells from "~/components/poststable/custiomcell";
import { TablePropsTypes } from "~/components/poststable/types";
import StatCard from "~/components/statCard/statCard";
import { authenticate } from "~/utils/authHelper.server";
import { db } from "~/utils/db.server";
import { Route } from "./+types/_admin.dashboard";

export const loader = async ({ request }: Route.LoaderArgs) => {
  await authenticate(request);
  const postCount = await db.post.count();
  const commentsCount = await db.comments.count();
  const viewsCount = await db.post.findMany({
    select: {
      readCount: true,
    },
  });
  const tablePosts = await db.post.findMany({
    select: {
      title: true,
      author: {
        select: {
          name: true,
          email: true,
        },
      },
      thumbnail: true,
      createdAt: true,
      published: true,
      updatedAt: true,
      slug: true,
      id: true,
    },
  });
  const shareCount = 3000;
  return { postCount, commentsCount, viewsCount, shareCount, tablePosts };
};

export const action = async ({ request }: Route.ActionArgs) => {
  const formdata = await request.formData();
  const delete_Post_id = formdata.get("delete");
  try {
    if (!delete_Post_id) {
      throw new Error("Post ID is missing in the form data.");
    }

    const deleted = await db.post.delete({
      where: {
        id: delete_Post_id as string,
      },
    });

    if (!deleted) {
      throw new Error("Post not found or could not be deleted.");
    }

    return new Response(
      JSON.stringify({ message: "Post deleted successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    let errorMessage = "An unknown error occurred.";

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  // const userID = useOutletContext();
  const { commentsCount, postCount, shareCount, viewsCount, tablePosts } =
    loaderData;
  const tablePostData: TablePropsTypes[] = tablePosts.map((post) => ({
    id: post.id,
    email: post.author.email,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    title: post.title,
    published: post.published, // This will work as boolean is acceptable in the type
    thumbnail: post.thumbnail,
    slug: post.thumbnail,
    author: post.author.name, // Extract just the name from the author object
  }));
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  const sumOfViewCounts = viewsCount.reduce((a, b) => {
    const n = b.readCount!;
    return a + n;
  }, 0);
  return (
    <div className="m-auto my-5 w-full space-y-10 px-4 py-5 sm:w-[60%]">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <div className="flex flex-wrap items-center justify-center gap-6">
        <StatCard
          count={formatter.format(postCount)}
          forStat={"Posts"}
          icon={"/dashboardcards/typewriter-write-type-writer-svgrepo-com.svg"}
        ></StatCard>
        <StatCard
          count={formatter.format(commentsCount)}
          forStat={"Comments"}
          icon={"/dashboardcards/comment-5-svgrepo-com.svg"}
        ></StatCard>
        <StatCard
          count={formatter.format(sumOfViewCounts)}
          forStat={"Reads"}
          icon={"/dashboardcards/view-grid-many-svgrepo-com.svg"}
        ></StatCard>
        <StatCard
          count={formatter.format(shareCount)}
          forStat={"Shares"}
          icon={"/dashboardcards/share-svgrepo-com.svg"}
        ></StatCard>
      </div>
      <div>
        <h1 className="text-4xl font-bold">Posts</h1>
        <br />
        <CustomCells posts={tablePostData}></CustomCells>
      </div>
    </div>
  );
}
