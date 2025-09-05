import React from "react";

function SettingIcon() {
  return (
    <svg
      width="30"
      height="25"
      viewBox="0 0 30 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="stroke-gray-400 hover:stroke-black transition-colors"
    >
      <path
        d="M28 2H2M23.125 12.5H2M18.25 23H2"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default React.memo(SettingIcon);
