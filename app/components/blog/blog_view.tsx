import { Interweave } from "interweave";
import { BlogViewType } from "~/types/blog_view_type";

type BlogViewProps = {
  post: BlogViewType;
};

export default function BlogView({ post }: BlogViewProps) {
  const {
    author,
    content,
    updatedAt,
    category,
    readCount,
    thumbnail,
    tags,
    title,
    synopsis,
    readTime,
  } = post;
  function transform(node: HTMLElement): React.ReactNode {
    if (node.innerHTML === "&nbsp;") {
      return null;
    }
  }

  return (
    <div className="bn-google mt-10">
      <div className="my-2">
        <h1 className="text-5xl">{title}</h1>
        <h3 className="font-bold text-foreground-500">By {author.name}</h3>
      </div>
      <div className="my-5 h-[40rem] w-full rounded-md">
        <img
          src={thumbnail}
          className="h-full w-full rounded-md object-cover"
          alt="Banner"
        />
      </div>
      <div className="m-auto my-2 space-y-2">
        <div className="flex items-center justify-start gap-10 text-sm text-foreground-500">
          <p>Reading Time {readTime}</p>
          <p>Category {category}</p>
          <p>Tags: {tags}</p>
          <p>Reads: {readCount}</p>
          <p>{updatedAt}</p>
        </div>
        <p className="italic">{synopsis}</p>
      </div>
      <div className="prose prose-xl m-auto my-2 mt-5 min-w-[50dvw] p-0 text-justify">
        <Interweave noWrap transform={transform} content={content}></Interweave>
      </div>
    </div>
  );
}
