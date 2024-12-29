export type BlogViewType = {
  content: string | null;
  id: string;
  title: string;
  slug: string;
  readTime: string;
  tags: string | null;
  synopsis: string;
  category: string;
  recordDate: Date;
  createdAt: string | null;
  updatedAt: string | null;
  published: boolean;
  thumbnail: string;
  readCount: number | null;
  authorId: string;
  author: {
    title: string | null;
    name: string | null;
    shortbio: string | null;
  };
};
