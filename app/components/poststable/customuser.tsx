import { TablePropsTypes } from "./types";

interface Column {
  uid: keyof TablePropsTypes | "actions";
  name: string;
  id: string;
}

const columns: Column[] = [
  {
    uid: "author",
    name: "Author",
    id: crypto.randomUUID(),
  },
  {
    uid: "createdAt",
    name: "Create Time",
    id: crypto.randomUUID(),
  },
  {
    uid: "published",
    name: "Published",
    id: crypto.randomUUID(),
  },
  {
    uid: "thumbnail",
    name: "Thumb",
    id: crypto.randomUUID(),
  },
  {
    uid: "title",
    name: "Title",
    id: crypto.randomUUID(),
  },
  {
    uid: "updatedAt",
    name: "Update Time",
    id: crypto.randomUUID(),
  },
  {
    uid: "actions",
    name: "Actions",
    id: crypto.randomUUID(),
  },
];

export { columns };

