import { IconArrowRight } from "@tabler/icons-react";

import { Link } from "react-router";
import "./meet-author.css";
interface Author {
  id: string | null | undefined;
  image: string | null | undefined;
  name: string | null | undefined;
  shortbio: string | null | undefined;
  title: string | null | undefined;
}
export default function MeetAuthor(Author: { author: Author }) {
  const { author } = Author;
  return (
    <div className="parent-author m-auto flex items-center justify-center gap-2 rounded-lg bg-slate-500/30 sm:p-4 xl:w-[60%]">
      <div className="m-auto flex h-full w-fit flex-col items-start justify-center gap-10 rounded-lg bg-black/50 p-4 sm:p-10 md:bg-transparent lg:w-[700px]">
        <div className="flex flex-col items-start justify-center capitalize">
          <h1 className="text-xl font-bold light:text-black/60 dark:text-white/60 sm:text-4xl">
            {author.name ?? "Roksana Chowdhury"}
          </h1>
          <h2 className="text-base font-semibold text-gray-300 sm:text-2xl sm:light:text-black/50 sm:dark:text-white/50 md:text-gray-700">
            {author.title ?? "Author and Creative Director"}
          </h2>
        </div>

        <div className="">
          {" "}
          <p
            className="w-fit font-semibold italic text-gray-200 sm:text-justify sm:text-xl sm:leading-10 sm:dark:text-gray-200 md:text-gray-700"
            style={{ fontFamily: "K2D" }}
          >
            {author.shortbio ?? "Author BIO"}
          </p>
        </div>

        <div className="">
          <Link to={"about"}>
            <button className="group h-[3rem] w-[15rem] rounded-lg bg-white/80 text-xl font-bold capitalize text-black transition-colors duration-400 ease-in-out hover:bg-blue-100 lg:h-[5rem]">
              <p className="flex items-center justify-center gap-2">
                meet author{" "}
                <span>
                  <IconArrowRight className="w-0 duration-300 ease-soft-spring transition-width group-hover:w-10"></IconArrowRight>
                </span>
              </p>
            </button>
          </Link>
        </div>
      </div>
      <div className="group overflow-hidden rounded-lg">
        <div className="hidden sm:block">
          <img
            src={author.image ?? "auhtor-image/1.jpg"}
            className="rounded-lg transition-transform duration-500 ease-soft-spring group-hover:scale-110"
            alt="author"
          />
        </div>
      </div>
    </div>
  );
}
