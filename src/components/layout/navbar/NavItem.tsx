import React from "react";
import clsx from "clsx";

interface NavItemProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  Icon: React.ComponentType<{ active?: boolean } & React.SVGProps<SVGSVGElement>>;
  active: string;
}

export default function NavItem({ id, Icon, active, className, ...props }: NavItemProps) {
  const isActive = active === id;

  return (
    <div
      {...props}
      className={clsx(
        "group flex items-center justify-center rounded-lg cursor-pointer",
        id === "plus" && "bg-[rgba(0,0,0,0.07)]",
        !isActive && "hover:bg-[rgba(0,0,0,0.035)]",
        className,
      )}
    >
      <Icon active={isActive} />
    </div>
  );
}
