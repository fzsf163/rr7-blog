import { useEffect } from "react";
import { MetaFunction } from "react-router";
import { toast } from "react-toastify";
import "~/components/BlockNotEditor/htmlstyle.css";
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

export const action = async ({ request, params }: Route.ActionArgs) => {
  const blog = await request.formData();
  const imgUrl = blog.get("imgUrl") as string;
  const title = blog.get("title") as string;
  const slug = blog.get("slug") as string;
  const category = blog.get("category") as string;
  const readTime = blog.get("readTime") as string;
  const tags = blog.get("tags") as string;
  const synopsis = blog.get("synopsis") as string;
  const statusRadio = blog.get("statusRadio") as string;
  const blockData = blog.get("blockData") as string;
  const timeNow = blog.get("timenow") as string;
  try {
    await db.post.update({
      where: {
        id: params.slug,
      },
      data: {
        title: title ?? undefined,
        thumbnail: imgUrl ?? undefined,
        slug: slug ?? undefined,
        category: category ?? undefined,
        readTime: readTime ?? undefined,
        synopsis: synopsis ?? undefined,
        published: statusRadio === "publish" ? true : false,
        tags: tags ?? undefined,
        createdAt: undefined,
        updatedAt: timeNow,
        content: blockData,
      },
    });

    return "Success";
  } catch (error) {
    return error;
  }
};

export default function RouteComponent({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const notifySuccess = (text: string) => toast.success(text);

  useEffect(() => {
    if (actionData) {
      notifySuccess(actionData);
    }
  }, [actionData]);
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
