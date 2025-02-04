
interface Post {
  id: string;
  title: string;
}

interface Slider {
  id: string;
  contents: string;
}

interface FeaturedBlog {
  id: string;
  contents: string;
}
interface TrendingBlogs {
  id: string;
  contents: string;
}

export interface LoaderDataProps {
  slider: Slider[];
  featuredPosts: FeaturedBlog[];
  posts: Post[];
  trending: TrendingBlogs[];
}
