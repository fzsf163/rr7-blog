import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface TablePropsTypes {
  createdAt: string | null;
  updatedAt: string | null;
  thumbnail: string;
  title: string;
  published: string | boolean;
  author: string | null;
  id: string | null;
  email: string | null;
  slug: string | null;
  // actions?: {
  //   view: (id: string) => void;
  //   delete: (id: string) => void;
  //   edit: (id: string) => void;
  // };
}

export interface POSTSTYPES {
  posts: TablePropsTypes[];
}
