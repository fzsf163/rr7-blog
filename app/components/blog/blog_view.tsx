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
    <div className="bn-google">
      <div className="my-2">
        <h1 className="text-5xl">{title}</h1>
      </div>
      <div className="my-5 h-[40rem] w-full rounded-md">
        <img
          src={thumbnail}
          className="h-full w-full rounded-md object-cover"
          alt="Banner"
        />
      </div>
      <div className="my-2">
        <p>Reading Time {readTime}</p>
        <p>Category {category}</p>
        <p>Synopsis :{synopsis}</p>
        <p>Tags: {tags}</p>
        <p>Reads: {readCount}</p>
        <p className="text-sm">{updatedAt}</p>
      </div>
      <div className="my-2">
        <p>Author:{author.name}</p>
        <p>ShortBio :{author.shortbio}</p>
        <p>Title: {author.title}</p>
        <p className="text-sm">{updatedAt}</p>
      </div>
      <div className="prose my-2 min-w-full p-0">
        <Interweave noWrap transform={transform} content={content}></Interweave>
      </div>
    </div>
  );
}
