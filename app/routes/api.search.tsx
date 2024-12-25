import { LoaderFunctionArgs } from "react-router";
import { db } from "~/utils/db.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  let sq = new URL(request.url);
  let q = sq.searchParams.get("blogSearch");
  if (q !== null || q !== undefined) {
    const posts = await db.post.findMany({
      where: {
        title: {
          mode: "insensitive",
          contains: q!,
        },
      },
    });

    return posts;
  }
};
