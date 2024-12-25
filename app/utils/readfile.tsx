import { readdir } from "node:fs/promises";

export async function readingDir() {
  const files = await readdir("./public"); // current working directory
  for (const file of files) {
    console.log(file);
  }
}
