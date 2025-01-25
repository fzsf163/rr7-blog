import { Tooltip } from "@heroui/react";
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
    <Tooltip
      key={index + 12 - 3}
      content={`GoTo Slide ${index + 1}`}
      className="bg-black text-white"
    >
      <button
        style={{
          backgroundImage: `url("${img}")`,
          objectFit: "contain",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundPosition: "center center",
          border: "none", // Remove default button border
          padding: 0, // Remove default button padding
          cursor: "pointer", // Add pointer cursor
        }}
        className={`size-[4rem] rounded-lg transition-all duration-300 ease-in-out xl:size-[7rem] ${
          selected ? "scale-110 rounded-lg opacity-100" : "opacity-80 scale-95"
        }`}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onClick();
          }
        }}
        aria-label={`Select ${img}`} // Add aria-label for accessibility
      >
        {/* You can add any content or icon here if needed */}
      </button>
    </Tooltip>
  );
};
