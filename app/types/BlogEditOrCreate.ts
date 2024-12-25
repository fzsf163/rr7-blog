import { Block } from "@blocknote/core";

export interface CreateBlogProps {
  initialData?: {
    title?: string;
    slug?: string;
    readTime?: string;
    tags?: string;
    synopsis?: string;
    imgUrl?: string;
    finalUrl?: string;
    blocks?: Block[];
    statusSelected?: string;
    html?: string;
    createdAt?: string;
    updatedAt?: string;
    htmlFromBlock?: string;
  };
}
