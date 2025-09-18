import React from "react";

export default function BaseHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center px-4 h-16 w-full max-w-[640px] -mb-3">
      {children}
    </div>
  );
}
