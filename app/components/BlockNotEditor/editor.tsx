import { Block } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useTheme } from "next-themes";
import { memo, useEffect } from "react";
import "./editorstyle.css";
type props = {
  blocks: Block[];
  setBlocks: (blocks: Block[]) => void;
  setHTML: (html: string) => void;
  htmlFormBlock?: string;
};

// const { useCreateBlockNote } = await import("@blocknote/react");

function Editor({ blocks, setBlocks, setHTML, htmlFormBlock }: props) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;
  const cloudPreset = process.env.CLOUDINARY_CLOUD_PRESET!;
  const API_CLOUDINARY = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const { theme } = useTheme();
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
    trailingBlock: false,
    defaultStyles: false,
    uploadFile: uploadFile,
    initialContent: blocks.length <= 0 ? undefined : blocks,
    setIdAttribute: true,
  });

  // For initialization; on mount, convert the initial HTML to blocks and replace the default editor's content
  useEffect(() => {
    async function loadInitialHTML() {
      const blocks = await editor.tryParseHTMLToBlocks(htmlFormBlock!);
      editor.replaceBlocks(editor.document, blocks);
    }
    loadInitialHTML();
  }, [editor, htmlFormBlock]);

  // Renders the editor instance using a React component.
  return (
    <div className="relative rounded shadow">
      <BlockNoteView
        editor={editor}
        onChange={onChange}
        theme={theme === "dark" ? "dark" : "light"}
      />
    </div>
  );
}

export default memo(Editor);
