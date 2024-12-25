import { IconArrowRight } from "@tabler/icons-react";

import { Link } from "react-router";
import "./meet-author.css";
export default function MeetAuthor() {
  return (
    <div className="parent-author m-auto flex items-center justify-center gap-2 rounded-lg bg-slate-500/30 sm:p-4 xl:w-[60%]">
      <div className="m-auto flex h-full w-fit flex-col items-start justify-center gap-10 rounded-lg bg-black/50 p-4 sm:p-10 md:bg-transparent lg:w-[700px]">
        <div className="flex flex-col items-start justify-center capitalize">
          <h1 className="text-xl font-bold light:text-black/60 dark:text-white/60 sm:text-4xl">
            Roksana Chowdhury
          </h1>
          <h2 className="text-base font-semibold text-gray-300 sm:text-2xl sm:light:text-black/50 sm:dark:text-white/50 md:text-gray-700">
            Author and Creative Director
          </h2>
        </div>

        <div className="">
          {" "}
          <p
            className="w-fit font-semibold italic text-gray-200 sm:text-justify sm:text-xl sm:leading-10 sm:dark:text-gray-200 md:text-gray-700"
            style={{ fontFamily: "K2D" }}
          >
            Blogs that changes your life forever is here. Written by Roksana
            Chowdhury. Integrating science of living and science of mind in one
            place. Going beyond and diving deep in the infinite world of
            thoughts and imagination.
          </p>
        </div>

        <div className="">
          <Link to={"about"}>
            <button className="group h-[3rem] w-[15rem] rounded-lg bg-white/80 text-xl font-bold capitalize text-black lg:h-[5rem] hover:bg-blue-100 transition-colors duration-400 ease-in-out">
              <p className="flex items-center justify-center gap-2">
                meet author{" "}
                <span>
                  <IconArrowRight className="w-0 group-hover:w-10 transition-width duration-300 ease-soft-spring"></IconArrowRight>
                </span>
              </p>
            </button>
          </Link>
        </div>
      </div>
      <div className="group overflow-hidden rounded-lg">
        <div className="hidden sm:block">
          <img
            src="auhtor-image/1.jpg"
            className="rounded-lg transition-transform duration-500 ease-soft-spring group-hover:scale-110"
            alt="author image"
          />
        </div>
      </div>
    </div>
  );
}
