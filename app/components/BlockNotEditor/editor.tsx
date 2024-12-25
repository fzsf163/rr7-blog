import { Block } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { memo } from "react";
import "./editorstyle.css";
type props = {
  blocks: Block[];
  setBlocks: (blocks: Block[]) => void;
  setHTML: (html: string) => void;
};

// const { useCreateBlockNote } = await import("@blocknote/react");

function Editor({ blocks, setBlocks, setHTML }: props) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;
  const cloudPreset = process.env.CLOUDINARY_CLOUD_PRESET!;
  const API_CLOUDINARY = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  async function uploadFile(file: File) {
    const body = new FormData();
    body.append("file", file);
    body.append("upload_preset", cloudPreset);

    const res = await fetch(API_CLOUDINARY, {
      method: "POST",
      body: body,
    });
    const url = res.json().then((x) => {
      return x.url;
    });
    return url;
  }

  const onChange = async () => {
    // Converts the editor's contents from Block objects to HTML and store to state.
    const html = await editor.blocksToHTMLLossy(editor.document);
    setHTML(html);
    // Saves the document JSON to state.
    setBlocks(editor.document);
  };
  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    domAttributes: {
      block: {
        class: "block-base",
      },
    },
    trailingBlock: false,
    defaultStyles: false,
    uploadFile: uploadFile,
    initialContent: blocks.length <= 0 ? undefined : blocks,
  });

  // Renders the editor instance using a React component.
  return (
    <div className="rounded border border-black shadow">
      <BlockNoteView editor={editor} onChange={onChange} theme={"light"} />
    </div>
  );
}

export default memo(Editor);
