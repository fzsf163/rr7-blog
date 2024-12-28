import { Interweave } from "interweave";
import "~/components/BlockNotEditor/htmlstyle.css";
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
    <div>
      <div>
        <h1 className="text-4xl">{formData.title}</h1>
      </div>
      <div>
        <img src={imgUrl === "" ? finalUrl : imgUrl} alt="" />
      </div>
      <div>
        <p>{formData.readTime}</p>
        <p>{formData.slug}</p>
        <p>{formData.synopsis}</p>
        <p>{formData.tags}</p>
        <p className="capitalize">{relativeDay}</p>
      </div>
      <div className="prose prose-h1:text-7xl">
        <Interweave content={html}></Interweave>
      </div>
    </div>
  );
}
