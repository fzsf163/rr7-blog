import { db } from "~/utils/db.server";
import type { Route } from "./+types/api.search";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const sq = new URL(request.url);
  const q = sq.searchParams.get("blogSearch");
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
