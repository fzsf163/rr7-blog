import { Tooltip } from "@nextui-org/react";
import { IconFileX, IconUpload } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { Form, Link } from "react-router";
import { toast } from "react-toastify";
import { authenticate } from "~/utils/authHelper.server";
import { db } from "~/utils/db.server";
import type { Route } from "./+types/_admin.aboutOptions";

export async function action({ request }: Route.ActionArgs) {
  const userId = await authenticate(request);
  const formdata = await request.formData();
  const name = formdata.get("userName");
  const title = formdata.get("userTitle");
  const description = formdata.get("userDescription");
  const pagewords = formdata.get("userAboutpagewords");
  const imgurl = formdata.get("imgUrl");
  try {
    const update = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        image: (imgurl as string) || undefined,
        authorblog: (pagewords as string) || undefined,
        shortbio: (description as string) || undefined,
        name: (name as string) || undefined,
        title: (title as string) || undefined,
      },
    });
    if (update) {
      return "About page Update successful";
    }
  } catch (error) {
    return error;
  }

  return null;
}

export default function AboutOptions({ actionData }: Route.ComponentProps) {
  const [imgUrl, setImgUrl] = useState<string>("");
  const [finalUrl, setFinalUrl] = useState<string>("");
  const [imgFile, setImgFile] = useState<File | null>();
  const formref = useRef<HTMLFormElement>(null);
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
            setImgUrl("");
            console.log(data.url);
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
  };
  useEffect(() => {
    if (actionData === undefined) return;
    if (actionData) {
      formref.current?.reset();
      setFinalUrl("");
      toast.success("Data Updated");
    }
  }, [actionData]);
  return (
    <div className="mx-auto w-fit space-y-2 py-5 sm:w-[70%]">
      <h1 className="text-4xl font-bold">About Options</h1>
      <p className="rounded bg-neutral-300 p-2 text-lg text-gray-600">
        Live Preview{" "}
        <Link
          target="_blank"
          to={"/about"}
          className="text-blue-800"
          rel="noreferrer"
        >
          Here
        </Link>
      </p>
      <div className="relative h-[20rem] w-full rounded-md bg-gray-200 outline-dashed outline-1 outline-blue-400">
        <div className="h-full w-full">
          {imgUrl ? (
            <img
              src={imgUrl}
              className="h-full w-full rounded-md object-cover"
              alt="Uploaded thumbnail"
            />
          ) : (
            <label
              htmlFor="thumbImage"
              className="grid h-full w-full cursor-pointer place-items-center bg-blue-400 text-xl font-semibold text-white shadow transition-colors duration-700 ease-soft-spring hover:bg-pink-300"
            >
              <div className="flex items-center gap-2">
                <span>Upload Thumbnail</span>
                <IconUpload stroke={2} />
              </div>
              <input
                id="thumbImage"
                type="file"
                name="thumbImage"
                accept="image/*"
                hidden
                onChange={(e) => objUrl(e.currentTarget.files)}
              />
            </label>
          )}
        </div>
        {imgUrl && (
          <div className="absolute top-0 mt-4 flex gap-4 pl-2">
            <button
              onClick={clearImage}
              className="flex items-center justify-center gap-1 rounded-md bg-red-500 px-3 py-2 text-white"
            >
              <IconFileX></IconFileX>
              Clear Image
            </button>

            <button
              onClick={sendPhoto}
              className="flex items-center justify-center gap-1 rounded-md bg-green-600 px-3 py-2 text-white"
            >
              <IconUpload />
              Upload Image
            </button>
          </div>
        )}
      </div>
      <Form ref={formref} className="space-y-5 pt-4" method="post">
        <input
          type="text"
          name="imgUrl"
          id="imgUrl"
          hidden
          readOnly
          value={finalUrl}
        />
        <div className="flex flex-col items-start gap-2">
          <label className="font-bold text-gray-500" htmlFor="userName">
            Your Name
          </label>
          <input
            className="w-full rounded bg-neutral-300 px-3 py-5 text-xl font-semibold text-white placeholder:text-gray-400"
            placeholder="write a name..."
            type="text"
            name="userName"
            id="userName"
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <label className="font-bold text-gray-500" htmlFor="userTitle">
            Your Title
          </label>
          <input
            className="w-full rounded bg-neutral-300 px-3 py-5 text-xl font-semibold text-white placeholder:text-gray-400"
            placeholder="write a title..."
            type="text"
            name="userTitle"
            id="userTitle"
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <label className="font-bold text-gray-500" htmlFor="userDescription">
            Little Description
          </label>
          <textarea
            className="w-full rounded bg-neutral-300 px-3 py-5 text-xl font-semibold text-white placeholder:text-gray-400"
            placeholder="write a little description..."
            name="userDescription"
            id="userDescription"
            rows={4}
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <label
            className="font-bold text-gray-500"
            htmlFor="userAboutpagewords"
          >
            Everyhting For About Page
          </label>
          <textarea
            className="w-full rounded bg-neutral-300 px-3 py-5 text-xl font-semibold text-white placeholder:text-gray-400"
            placeholder="write a a big description..."
            name="userAboutpagewords"
            id="userAboutpagewords"
            rows={10}
          />
        </div>
        <Tooltip content="Submit or Update Data">
          <button className="submit-button" type="submit">
            Submit
          </button>
        </Tooltip>
        <Tooltip content="Reset fields">
          <button className="submit-button mx-5" type="reset">
            Reset
          </button>
        </Tooltip>
      </Form>
    </div>
  );
}
