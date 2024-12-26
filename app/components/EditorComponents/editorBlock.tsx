import { Block } from "@blocknote/core";
import { Radio, RadioGroup, Spinner } from "@nextui-org/react";
import { IconFileX, IconUpload } from "@tabler/icons-react";
import { ClientOnly } from "remix-utils/client-only";
import Editor from "../BlockNotEditor/editor";
import { DropCategories } from "./dropcategories";

export default function EditorBlock(
  imgUrl: string,
  objUrl: (file: FileList | null) => void,
  sendPhoto: () => Promise<void>,
  finalUrl: string,
  timeNow: string,
  timeZone: string,
  blocks: Block[],
  setHTMl: (html: string) => void,
  setBlocks: (blocks: Block[]) => void,
  clearImage: () => void,
  setStatusSelected: (status: string) => void,
  stausSelected: string,
  formData: {
    title: string;
    slug: string;
    readTime: string;
    tags: string;
    synopsis: string;
  },
  handleChange: (e: { target: { name: string; value: string } }) => void,
  handleTitleChange: (e: { target: { value: string } }) => void,
  htmlFromBlock?: string,
) {
  return (
    <div className="relative w-full">
      <div className="h-[20rem] w-full rounded-md bg-gray-200 outline-dashed outline-1 outline-blue-400">
        <div className="relative h-full w-full">
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
      <input
        type="text"
        name="imgUrl"
        id="imgUrl"
        hidden
        readOnly
        value={finalUrl}
      />
      <div className="grid h-full w-full auto-cols-fr auto-rows-auto gap-5 py-4 [&_input]:border-b-3 [&_input]:border-blue-400 [&_input]:p-1 [&_input]:font-semibold [&_input]:outline-none [&_textarea]:border-b-3 [&_textarea]:border-blue-400 [&_textarea]:p-1 [&_textarea]:font-semibold [&_textarea]:outline-none">
        <input
          type="text"
          name="title"
          placeholder="write a title for the blog"
          className="col-span-5 w-full bg-transparent text-xl capitalize transition-all duration-500 ease-soft-spring focus:border-green-600"
          value={formData.title}
          onChange={handleTitleChange}
        ></input>
        <input
          type="text"
          name="slug"
          placeholder="slug for URL"
          className="text-md col-span-3 w-full bg-transparent capitalize transition-all duration-500 ease-soft-spring focus:border-green-600"
          value={formData.slug}
          onChange={handleChange}
        ></input>
        <div className="col-span-2">
          <DropCategories></DropCategories>
        </div>
        <input
          type="text"
          name="readTime"
          placeholder="Reading Time"
          className="text-md col-span-1 w-full bg-transparent capitalize transition-all duration-500 ease-soft-spring focus:border-green-600"
          value={formData.readTime}
          onChange={handleChange}
        ></input>
        <input
          type="text"
          name="tags"
          placeholder="Tags [optional]"
          className="text-md col-span-4 w-full bg-transparent capitalize transition-all duration-500 ease-soft-spring focus:border-green-600"
          value={formData.tags}
          onChange={handleChange}
        ></input>
        <textarea
          name="synopsis"
          placeholder="Synopsis"
          className="text-md col-span-5 w-full bg-transparent transition-all duration-500 ease-soft-spring focus:border-green-600"
          rows={4}
          value={formData.synopsis}
          onChange={handleChange}
        ></textarea>
        <div className="text-md col-auto flex items-center justify-start gap-4 text-black/60 sm:col-span-4 [&_p]:text-gray-400">
          <div className="space-y-2">
            <div className="font-semibold text-foreground-500">
              <RadioGroup
                label="Status"
                orientation="horizontal"
                value={stausSelected}
                onValueChange={setStatusSelected}
                name="statusRadio"
              >
                <Radio value="publish">Publish</Radio>
                <Radio value="draft">Draft</Radio>
              </RadioGroup>
            </div>
            <input type="text" hidden value={timeNow} name="timenow" readOnly />
            <p>
              Created: {timeNow} - {timeZone}
            </p>
            <p>Upadate: {timeNow}</p>
          </div>
        </div>
      </div>
      <br />
      <ClientOnly fallback={<Spinner />}>
        {() => (
          <Editor
            blocks={blocks}
            setHTML={setHTMl}
            setBlocks={setBlocks}
            htmlFormBlock={htmlFromBlock}
          ></Editor>
        )}
      </ClientOnly>
      <br />
      <br />
      <br />
    </div>
  );
}
