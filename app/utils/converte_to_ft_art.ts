import { FeaturedArticleType } from "~/types/featured_article_type";
import { Post } from "~/types/post_data_type";

// Function to convert post.data to an array of FeaturedArticleType
export function convertPostDataToFeaturedArticleArray(
  post: Post,
): FeaturedArticleType[] {
  return post.data.map((item) => ({
    cardtitleOne: item.title,
    cardtitleTwo: item.synopsis ?? "Unknown Author", // Use nullish coalescing to provide a default value
    img: item.thumbnail,
    cardfooter: item.category,
    id: item.id,
  }));
}
