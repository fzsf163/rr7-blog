import { MetaFunction } from "react-router";
import BlogComponent from "~/components/EditorComponents/editorComponent";
import { db } from "~/utils/db.server";
import type { Route } from "./+types/_admin.editBlog.$slug";

export const meta: MetaFunction = () => [
  // your meta here
  {
    title: "Edit Blog",
  },
];

export const loader = async ({ params }: Route.LoaderArgs) => {
  const post = await db.post.findUnique({
    where: {
      id: params.slug,
    },
  });
  return post;
};

export const action = async ({ request }: Route.ActionArgs) => {
  const formdata = await request.formData();
  console.log("🚀 ~ action ~ formdata:", formdata)
  return { request };
};

export default function RouteComponent({ loaderData }: Route.ComponentProps) {
  return (
    <BlogComponent
      initialData={{
        htmlFromBlock: loaderData?.content as string,
        finalUrl: loaderData?.thumbnail,
        imgUrl: loaderData?.thumbnail,
        readTime: loaderData?.readTime,
        slug: loaderData?.slug,
        tags: loaderData!.tags!,
        statusSelected: loaderData?.published === true ? "publish" : "draft",
        title: loaderData?.title,
        synopsis: loaderData?.synopsis,
        createdAt: loaderData?.createdAt as string,
        updatedAt: loaderData?.updatedAt as string,
      }}
    ></BlogComponent>
  );
}
