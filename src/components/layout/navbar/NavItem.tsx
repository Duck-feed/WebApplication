interface NavItemProps {
    id: string
    Icon: React.ComponentType<{ active?: boolean }>
    active: string
    onClick?: () => void
    className?: string
}

export default function NavItem({ id, Icon, active, onClick, className }: NavItemProps) {
    const isActive = active === id

    return (
        <div
            onClick={onClick}
            className={[
                "group flex items-center justify-center rounded-lg cursor-pointer",
                id === "plus"
                    ? "bg-[rgba(0,0,0,0.07)]"
                    : !isActive && "hover:bg-[rgba(0,0,0,0.035)]",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <Icon active={isActive} />
        </div>
    )
}
