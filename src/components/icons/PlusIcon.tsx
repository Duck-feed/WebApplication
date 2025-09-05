import React from "react";

function PlusIcon() {
    return (
        <svg
            width="26"
            height="25"
            viewBox="0 0 26 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-colors"
        >
            <path
                d="M13 2V23M2 12.5H24"
                className="stroke-gray-400 group-hover:stroke-black transition-colors"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default React.memo(PlusIcon);
