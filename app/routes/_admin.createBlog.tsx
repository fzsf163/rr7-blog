import { Block } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/core/style.css";
import { Button, Tab, Tabs } from "@nextui-org/react";
import { IconEyeCheck, IconFileFunction, IconPlus } from "@tabler/icons-react";
import { formatDistance } from "date-fns";
import { Interweave } from "interweave";
import { useState } from "react";
import { data, Form } from "react-router";
import { toast } from "react-toastify";
import "~/components/BlockNotEditor/htmlstyle.css";
import EditorBlock from "~/components/EditorComponents/editorBlock";
import { EyeIcon } from "~/components/poststable/EyeIcon";
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
  const timeNow = new Date().toLocaleDateString("ca");
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

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
        createdAt: timeNow + " " + timeZone,
        updatedAt: timeNow + " " + timeZone,
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

export default function CreateBlog() {
  const [imgUrl, setImgUrl] = useState<string>("");
  const [finalUrl, setFinalUrl] = useState<string>("");
  const [imgFile, setImgFile] = useState<File | null>();
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [stausSelected, setStatusSelected] = useState<string>("publish");
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    readTime: "",
    tags: "",
    synopsis: "",
  });

  // Handle input changes
  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Optional: Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .trim();
  };

  // Handle title change with automatic slug generation
  const handleTitleChange = (e: { target: { value: string } }) => {
    const newTitle = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: newTitle,
      slug: generateSlug(newTitle),
    }));
  };
  const [html, setHTML] = useState<string>("");
  const date = new Date();

  const relativeDay = formatDistance(date, date);
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;
  const cloudPreset = process.env.CLOUDINARY_CLOUD_PRESET!;
  const API_CLOUDINARY = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const objUrl = (file: FileList | null) => {
    const img = file?.[0];
    setImgFile(img);
    const url = URL.createObjectURL(img!);
    setImgUrl(url);
  };
  const sendPhoto = async () => {
    if (imgFile != null) {
      const formData = new FormData();
      formData.append("file", imgFile);
      formData.append("upload_preset", cloudPreset);
      await toast.promise(
        fetch(API_CLOUDINARY, { method: "POST", body: formData })
          .then(async (res) => {
            if (res.ok === false) {
              const error = await res.json().then((e) => {
                return e.error.message;
              });
              throw new Error(error);
            }
            return res.json();
          })
          .then((data) => {
            setFinalUrl(data.url);
            // setImgUrl("");
          }),
        {
          pending: "Uploading Image",
          success: "Upload Successful",
          error: {
            render({ data }) {
              return <div className="text-warning-400">{`${data}`}</div>;
            },
          },
        },
      );
    }
  };
  // Function to clear the uploaded image
  const clearImage = () => {
    setImgFile(null);
    setImgUrl("");
  };
  const Preview = (
    <div>
      <div>
        <h1>{formData.title}</h1>
      </div>
      <div>
        <img src={imgUrl === "" ? finalUrl : imgUrl} alt="" />
      </div>
      <div>
        <p>{formData.readTime}</p>
        <p>{formData.slug}</p>
        <p>{formData.synopsis}</p>
        <p>{formData.tags}</p>
        <p className="capitalize">{relativeDay}</p>
      </div>
      <div className="rich-text">
        <Interweave content={html}></Interweave>
      </div>
    </div>
  );
  return (
    <div className="m-auto w-fit px-4 sm:w-[90%]">
      {/* edit tab */}
      <Tabs
        color="secondary"
        aria-label="blog creation"
        size="lg"
        radius="sm"
        className="pt-3 font-bold"
      >
        <Tab
          key={"Create"}
          title={
            <div className="flex items-center justify-center gap-1">
              {" "}
              <IconPlus></IconPlus> Create
            </div>
          }
        >
          <Form method="POST" encType="multipart/form-data">
            {EditorBlock(
              imgUrl,
              objUrl,
              sendPhoto,
              finalUrl,
              date.toDateString(),
              timeZone,
              blocks,
              setHTML,
              setBlocks,
              clearImage,
              setStatusSelected,
              stausSelected,
              formData,
              handleChange,
              handleTitleChange,
            )}
            <div>
              <div className="mb-5 grid auto-cols-max grid-flow-col gap-3">
                <input
                  type="text"
                  name="blockData"
                  value={html}
                  hidden
                  readOnly
                />
                <Button
                  color="danger"
                  radius="sm"
                  className="text-white"
                  type="submit"
                >
                  <IconFileFunction></IconFileFunction>
                  Save
                </Button>
                <Button
                  color="secondary"
                  radius="sm"
                  className="text-white"
                  type="button"
                >
                  <EyeIcon className="size-12"></EyeIcon>
                  <span>See Blog</span>
                </Button>
              </div>
            </div>
          </Form>
        </Tab>
        <Tab
          key={"Preview"}
          title={
            <div className="flex items-center justify-center gap-1">
              {" "}
              <IconEyeCheck></IconEyeCheck> Preview
            </div>
          }
        >
          {Preview}
        </Tab>
      </Tabs>
    </div>
  );
}
