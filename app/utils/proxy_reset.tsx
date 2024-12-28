// Define the reset function outside the component
const resetEditor = (editor: any) => {
  editor.removeBlocks(editor.document);
};

export { resetEditor };

