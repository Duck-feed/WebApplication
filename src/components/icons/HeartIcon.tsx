import React from "react";
import type { IconProps } from "../../types/IconProps";

function HeartIcon({ active }: IconProps) {
  return (
    <svg width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.7"
        d="M13 5.25905C10.3333 -1.0002 1 -0.333537 1 7.6665C1 15.6665 13 22.3334 13 22.3334C13 22.3334 25 15.6665 25 7.6665C25 -0.333537 15.6667 -1.0002 13 5.25905Z"
        fill={active ? "#FF0404" : "white"}
        stroke={active ? "none" : "black"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default React.memo(HeartIcon);
