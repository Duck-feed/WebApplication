import { useState } from "react";
import BaseHeader from "./layout/BaseHeader";

export default function FeedHeader() {
  const [activeTab, setActiveTab] = useState<"forYou" | "following">("forYou");

  return (
    <BaseHeader>
      <div
        className={`px-4 cursor-pointer pb-2 border-b-2 flex h-full items-center font-bold ${
          activeTab === "forYou"
            ? "border-black text-black border-b-2"
            : "border-transparent text-gray-500"
        }`}
        onClick={() => setActiveTab("forYou")}
      >
        For you
      </div>

      <div
        className={`px-4 cursor-pointer pb-2 border-b-2 flex h-full items-center font-bold ${
          activeTab === "following"
            ? "border-black text-black border-b-2"
            : "border-transparent text-gray-500"
        }`}
        onClick={() => setActiveTab("following")}
      >
        Following
      </div>
    </BaseHeader>
  );
}
