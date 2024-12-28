import { Interweave } from "interweave";
// import "~/components/BlockNotEditor/htmlstyle.css";
type PREVIEW = {
  title: string;
  slug: string;
  readTime: string;
  tags: string;
  synopsis: string;
};
type URL = string;
type DATAPROPS = {
  formData: PREVIEW;
  imgUrl: URL;
  finalUrl: URL;
  relativeDay: URL;
  html: string;
};

export default function Preview({
  formData,
  imgUrl,
  finalUrl,
  relativeDay,
  html,
}: DATAPROPS) {
  return (
    <div
      style={{
        fontFamily: "inter, sans-serif",
      }}
    >
      <div className="my-5">
        <h1 className="text-4xl">{formData.title}</h1>
      </div>
      <div className="my-5 h-[40rem] w-full rounded-md">
        <img
          src={imgUrl === "" ? finalUrl : imgUrl}
          className="h-full w-full rounded-md object-cover"
          alt="Banner"
        />
      </div>
      <div className="my-5">
        <p>Reading Time {formData.readTime}</p>
        <p>Ref Slug {formData.slug}</p>
        <p>Synopsis :{formData.synopsis}</p>
        <p>Tags: {formData.tags}</p>
        <p className="text-sm">{relativeDay}</p>
      </div>
      <div className="prose my-5 min-w-full">
        <Interweave className="" content={html}></Interweave>
      </div>
    </div>
  );
}
