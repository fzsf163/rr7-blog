import { BlockNoteEditor } from "@blocknote/core";

// Define the reset function outside the component
const resetEditor = (editor: BlockNoteEditor) => {
  editor.removeBlocks(editor.document);
};

export { resetEditor };

