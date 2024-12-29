// Define the post data structure
export interface Author {
  title: string | null;
  name: string | null;
  image: string | null;
  shortbio: string | null;
}

export interface PostData {
  author: Author;
  title: string;
  content: string | null;
  id: string;
  recordDate: Date;
  createdAt: string | null;
  updatedAt: string | null;
  slug: string;
  published: boolean;
  readTime: string;
  synopsis: string;
  tags: string | null;
  category: string;
  thumbnail: string;
  readCount: number | null;
  authorId: string;
}

export interface Post {
  status: number;
  statusText: string;
  data: PostData[];
}
