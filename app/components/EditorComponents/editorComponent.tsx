import { Block } from "@blocknote/core";
import { Button, Tab, Tabs } from "@nextui-org/react";
import { IconEyeCheck, IconFileFunction, IconPlus } from "@tabler/icons-react";
import { formatDistance } from "date-fns";
import { useState } from "react";
import { Form } from "react-router";
import { toast } from "react-toastify";
import { CreateBlogProps } from "~/types/BlogEditOrCreate";
import EditorBlock from "./editorBlock";
import Preview from "./preview";

const BlogComponent: React.FC<CreateBlogProps> = ({
  initialData,
}: CreateBlogProps) => {
  const [imgUrl, setImgUrl] = useState<string>(initialData?.imgUrl || "");
  const [finalUrl, setFinalUrl] = useState<string>(initialData?.finalUrl || "");
  const [imgFile, setImgFile] = useState<File | null | undefined>(null);
  const [blocks, setBlocks] = useState<Block[]>(initialData?.blocks || []);
  const [statusSelected, setStatusSelected] = useState<string>(
    initialData?.statusSelected || "publish",
  );
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    readTime: initialData?.readTime || "",
    tags: initialData?.tags || "",
    synopsis: initialData?.synopsis || "",
  });

  const [html, setHTML] = useState<string>(initialData?.html || "");
  const date = initialData?.createdAt ?? new Date().toDateString();
  const today = new Date().toDateString();
  const relativeDay = formatDistance(date, today);
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

  const clearImage = () => {
    setImgFile(null);
    setImgUrl("");
    setFinalUrl("");
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();
  };

  const handleTitleChange = (e: { target: { value: string } }) => {
    const newTitle = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: newTitle,
      slug: generateSlug(newTitle),
    }));
  };

  return (
    <div className="m-auto w-fit px-4 sm:w-[90%]">
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
              date,
              timeZone,
              blocks,
              setHTML,
              setBlocks,
              clearImage,
              setStatusSelected,
              statusSelected,
              formData,
              handleChange,
              handleTitleChange,
              initialData?.htmlFromBlock,
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
              </div>
            </div>
          </Form>
        </Tab>
        <Tab
          key={"Preview"}
          title={
            <div className="flex items-center justify-center gap-1">
              <IconEyeCheck></IconEyeCheck> Preview
            </div>
          }
        >
          {Preview({ formData, finalUrl, html, imgUrl, relativeDay })}
        </Tab>
      </Tabs>
    </div>
  );
};

export default BlogComponent;
