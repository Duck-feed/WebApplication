import React from "react";
import type { IconProps } from "../../types/IconProps";

function ProfileIcon({ active }: IconProps) {
  return (
    <svg width="25" height="29" viewBox="0 0 25 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        opacity={active ? "1" : "0.3"}
        d="M23.5 26.875 C23.5 23.078 18.5751 20 12.5 20 C6.42487 20 1.5 23.078 1.5 26.875 Z M12.5 15.875 C8.70304 15.875 5.625 12.797 5.625 9 C5.625 5.20304 8.70304 2.125 12.5 2.125 C16.297 2.125 19.375 5.20304 19.375 9 C19.375 12.797 16.297 15.875 12.5 15.875Z"
        stroke={active ? "black" : "#020202"}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={active ? "black" : "none"}
      />
    </svg>
  );
}

export default React.memo(ProfileIcon);
