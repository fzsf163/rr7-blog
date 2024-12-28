import "@blocknote/core/fonts/inter.css";
import "@blocknote/core/style.css";
import { useEffect } from "react";
import { data } from "react-router";
import { toast } from "react-toastify";
import BlogComponent from "~/components/EditorComponents/editorComponent";
import { authenticate } from "~/utils/authHelper.server";
import { db } from "~/utils/db.server";
import { createErrorResponse } from "~/utils/prismaErrorHandeling";
import type { Route } from "./+types/_admin.createBlog";
export const loader = async ({ request }: Route.LoaderArgs) => {
  const userId = await authenticate(request);
  return data(userId);
};

export const action = async ({ request }: Route.ActionArgs) => {
  const blog = await request.formData();
  const userId = await authenticate(request);
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
    await db.post.create({
      data: {
        title: title,
        thumbnail: imgUrl,
        slug: slug,
        category: category,
        readTime: readTime,
        synopsis: synopsis,
        published: statusRadio === "publish" ? true : false,
        tags: tags,
        createdAt: timeNow,
        updatedAt: timeNow,
        content: blockData,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return "Success";
  } catch (error) {
    return createErrorResponse(error);
  }
};

// dropdown box for categories

export default function CreateBlog({ actionData }: Route.ComponentProps) {
  const notifySuccess = (text: string) => toast.success(text);

  useEffect(() => {
    if (actionData?.toString()) {
      notifySuccess(actionData.toString());
    }
  }, [actionData]);
  return <BlogComponent></BlogComponent>;
}
