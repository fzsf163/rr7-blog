import { Block } from "@blocknote/core";
import { ServerBlockNoteEditor } from "@blocknote/server-util";
export const renderHTml = async (blocks: Block[]) => {
  const editor = ServerBlockNoteEditor.create();
  try {
    const html = await editor.blocksToFullHTML(blocks);
    return html;
  } catch (error) {
    console.log("🚀 ~ renderHTml ~ error:", error);
    throw Error(error as string);
  }
};
