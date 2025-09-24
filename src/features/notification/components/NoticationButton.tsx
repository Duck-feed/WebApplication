import type { RootState } from "@/app/store";
import { type HTMLAttributes } from "react";
import { FaBell } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

type NotificationButtonProps = HTMLAttributes<HTMLDivElement>;

const NotificationButton = (props: NotificationButtonProps) => {
  const location = useLocation();
  const { countUnseen } = useSelector((state: RootState) => state.notification);

  const isActive = location.pathname.startsWith("/notifications");

  return (
    <div
      {...props}
      className={
        "group flex items-center justify-center rounded-lg cursor-pointer hover:bg-[rgba(0,0,0,0.035)] mx-1 p-3 w-16"
      }
    >
      <div className="relative">
        <FaBell
          className={`w-[25px] h-[25px] ${isActive ? "bg-[rgba(0,0,0,0.035)]" : "text-gray-400"}`}
        />
        {countUnseen > 0 && (
          <span
            className="absolute -top-1 -right-1 flex items-center justify-center
                   min-w-[18px] h-[18px] px-1 rounded-full bg-red-600 text-white text-[10px] font-bold"
          >
            {countUnseen > 99 ? "99+" : countUnseen}
          </span>
        )}
      </div>
    </div>
  );
};

export default NotificationButton;
