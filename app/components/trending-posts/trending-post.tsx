import { Tooltip } from "@heroui/react";
import { IconBook2, IconCalendarEvent } from "@tabler/icons-react";
import { Link } from "react-router";
import { TrendingBlogs } from "~/types/trending_types";
export default function TrendingPost({ trending }: TrendingBlogs) {
  return (
    <div className="m-auto space-y-10 text-center">
      <h1 className="fa-text text-xl font-bold uppercase sm:text-2xl md:text-5xl lg:text-6xl xl:text-8xl 2xl:text-9xl">
        Trending Posts
      </h1>

      <div className="inline-grid w-fit grid-cols-12 gap-4 bg-slate-300 p-2 shadow-md sm:gap-10 sm:rounded-xl md:p-20">
        {trending.map((trend, index) => {
          return (
            <Tooltip
              key={index + 1}
              content="See Post"
              className="bg-black text-white"
            >
              <Link
                key={index}
                className="group col-span-12 flex h-[7rem] w-full cursor-pointer justify-start gap-0 rounded-xl shadow-lg transition-colors duration-400 ease-in-out light hover:text-white light:bg-blue-400/40 hover:light:bg-blue-400 dark:bg-slate-500 hover:dark:bg-slate-400 md:h-[9rem] lg:col-span-6 xl:items-start"
                to={`/blog/${trend.id}`}
              >
                <div className="aspect-[4/3] h-[7rem] overflow-hidden rounded-lg p-2 md:h-[9rem]">
                  <img
                    src={trend.img}
                    className="h-full w-full rounded-lg object-cover transition-transform duration-500 ease-soft-spring group-hover:scale-125"
                    alt=""
                  ></img>
                </div>
                <div className="flex h-full max-w-[400px] flex-col items-start justify-between gap-1 p-5">
                  <h1 className="line-clamp-2 overflow-hidden text-ellipsis text-start text-xs font-bold capitalize sm:text-sm md:text-lg lg:text-lg xl:text-2xl">
                    {trend.title}
                  </h1>
                  <div className="flex items-start justify-between gap-4 sm:gap-10 *:[&_button]:light:text-black/30 *:[&_button]:dark:text-white/30">
                    <button className="flex items-start justify-between gap-1 bg-transparent p-0 text-xs sm:text-sm md:text-lg">
                      <span>
                        <IconCalendarEvent stroke={2} />
                      </span>
                      <p> {trend.published}</p>
                    </button>
                    <button className="pointer-events-none flex items-center justify-between bg-transparent p-0 text-xs sm:text-sm md:text-lg">
                      <span>
                        <IconBook2 stroke={2} />
                      </span>
                      <p> {trend.readingTime}</p>
                    </button>
                  </div>
                </div>
              </Link>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
