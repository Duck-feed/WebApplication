import React from "react";
import type { IconProps } from "../../types/IconProps";

function SearchIcon({ active }: IconProps) {
  return (
    <svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        opacity={active ? "1" : "0.6"}
        d="M17.5 18L25.5 26M10.8333 20.6667C5.67868 20.6667 1.5 16.488 1.5 11.3333C1.5 6.17868 5.67868 2 10.8333 2C15.988 2 20.1667 6.17868 20.1667 11.3333C20.1667 16.488 15.988 20.6667 10.8333 20.6667Z"
        stroke={active ? "black" : "gray"}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default React.memo(SearchIcon);
