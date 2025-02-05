import { Post } from "~/types/post_data_type";
import { Trending, TrendingBlogs } from "~/types/trending_types";

export function convertPostDataToTrendingArray(post: Post): TrendingBlogs {
  const t: Trending[] = post.data.map((item) => ({
    id: item.id,
    img: item.thumbnail,
    readingTime: item.readTime,
    title: item.title,
    published: item.createdAt ?? "Recent",
  }));

  return { trending: t ?? [] };
}
