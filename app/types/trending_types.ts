export interface Trending {
  title: string;
  readingTime: string;
  published?: string;
  img: string;
}
export interface TrendingBlogs {
  trending: Trending[];
}
