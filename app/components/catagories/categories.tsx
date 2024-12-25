import { Link } from "react-router";
import { IconArrowRight } from "@tabler/icons-react";
import "./categories.css";
const categories = [
  { label: "Spirituality", bgImg: "categoriesimg/spirituality.jpg" },
  { label: "Relationship", bgImg: "categoriesimg/relationship.jpg" },
  { label: "Lifestyle", bgImg: "categoriesimg/lifestyle.jpg" },
  { label: "Mental Health", bgImg: "categoriesimg/mentalhealth.jpg" },
  { label: "Money", bgImg: "categoriesimg/money.jpg" },
  { label: "Health", bgImg: "categoriesimg/health.jpg" },
];
export default function Categories() {
  return (
    <div className="mx-2 flex cursor-pointer flex-wrap items-center justify-center gap-2 text-white sm:gap-10">
      {categories.map((c, i) => {
        return (
          <div
            className="relative size-[100px] rounded-lg text-sm sm:size-[200px] sm:text-xl md:text-2xl"
            key={i}
            style={{
              backgroundImage: `url(${c.bgImg})`,
              backgroundPosition: "center center",
              objectFit: "cover",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          >
            <div className="cardCategory h-full w-full">
              <strong className="capitalize">{c.label}</strong>
              {/* <div className="card__body">Get UI elements that help you stand out.</div> */}
              {/* how to access link state */}
              <Link to={`blogs?category=${c.label}`}>
                <span className="text-sm sm:text-xl md:text-2xl">
                  See Blogs <IconArrowRight></IconArrowRight>
                </span>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
