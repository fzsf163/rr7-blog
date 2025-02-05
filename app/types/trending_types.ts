export interface Trending {
  id: string;
  title: string;
  readingTime: string;
  published?: string;
  img: string;
}
export interface TrendingBlogs {
  trending: Trending[];
}
