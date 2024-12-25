import { Tooltip } from "@nextui-org/react";
import React from "react";

type PropType = {
  selected: boolean;
  index: number;
  onClick: () => void;
  img: string;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, index, onClick, img } = props;

  return (
    <Tooltip key={index + 12 - 3} content={`GoTo Slide ${index + 1}` } className="bg-black text-white">
      <div
        // className={"embla-thumbs__slide".concat(
        //   selected ? " embla-thumbs__slide--selected " : ""
        // )}
        style={{
          backgroundImage: `url("${img}")`,
          objectFit: "contain",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundPosition: "center center",
        }}
        className={`size-[4rem] cursor-pointer rounded-lg transition-all duration-300 ease-in-out xl:size-[7rem] ${
          selected
            ? "scale-110 opacity-100 outline outline-4 outline-white"
            : "opacity-80"
        }`}
        onClick={onClick}
      >
        {/* <button type="button" className="embla-thumbs__slide__number">
      </button> */}
      </div>
    </Tooltip>
  );
};
