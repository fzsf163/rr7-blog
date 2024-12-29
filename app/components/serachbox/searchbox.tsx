import { IconSearch } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { FetcherWithComponents, Link } from "react-router";
import { PostData } from "~/types/post_data_type";
import "./searchbox.css";

interface SearchBoxProps {
  fetcher: FetcherWithComponents<unknown>;
  data: PostData[];
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SearchBox({ fetcher, data }: SearchBoxProps) {
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const resetFocus = () => {
    if (inputRef) {
      inputRef.current?.blur();
    }
  };
  return (
    <div className="group relative mx-auto w-fit">
      <div className="group relative m-auto flex w-fit items-center justify-center gap-2 rounded-lg bg-blue-400/20 p-4 shadow backdrop-blur-sm transition-all duration-500 ease-in-out focus-within:shadow-xl">
        <label htmlFor="blogSearchInput" aria-label="search icon as label">
          <IconSearch
            stroke={2}
            className="size-7 cursor-pointer bg-transparent shadow-black drop-shadow-xl"
          />
        </label>
        <input
          ref={inputRef}
          type="search"
          name="blogSearch"
          id="blogSearchInput"
          value={value}
          onKeyDown={(x) => {
            if (x.key === "Escape") {
              resetFocus();
            }
          }}
          onChange={(v) => {
            setValue(v.currentTarget.value);
            fetcher.submit(v.currentTarget.form);
          }}
          className="h-[40px] w-[10rem] border-b-2 border-current bg-transparent px-3 py-4 placeholder-slate-400 caret-purple-700 outline-none transition-all duration-500 ease-in-out placeholder:font-medium group-focus-within:w-[15rem] group-focus-within:font-semibold light:placeholder:text-black/40 sm:w-[25rem] sm:group-focus-within:w-[30rem] lg:w-[30rem] lg:group-focus-within:w-[60rem]"
          aria-label="search input"
          placeholder="search for blogs"
          style={{
            fontFamily: "K2D,sans-serif",
          }}
        />
        <button
          className={`absolute bottom-7 right-4 size-3 transition-opacity duration-700 ease-soft-spring ${value.length > 0 ? "opacity-100" : "opacity-0"}`}
          onClick={() => setValue("")}
        >
          <img src="/searchboxcross/cross.svg" alt="clear search input" />
        </button>
      </div>
      <div className="absolute left-0 top-20 z-50  w-full rounded-md bg-slate-400/80 text-[0px] text-white shadow backdrop-blur-sm transition-all duration-500 ease-in-out group-focus-within:h-full group-focus-within:w-full group-focus-within:p-3 group-focus-within:text-xl">
        {data?.length === 0 && (
          <p className="text-center font-bold">No Result Found</p>
        )}
        {data?.length > 0 &&
          value !== "" &&
          data.map((p) => {
            return (
              <div key={p.id}>
                <Link to={`/blog/${p.id}`}>
                  <span>{p.title}</span>
                  <span>
                    <img className="w-[50%]" src={p.thumbnail} alt="" />
                  </span>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}
