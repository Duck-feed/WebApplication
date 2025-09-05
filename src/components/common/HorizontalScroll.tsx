import { motion } from "framer-motion"
import {
  useRef,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"

type Props = {
  children: ReactNode
  className?: string
  onDragStateChange?: (isDragging: boolean) => void
}

export default function HorizontalScroll({
  children,
  className,
  onDragStateChange,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [constraints, setConstraints] = useState({ left: 0, right: 0 })

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const updateConstraints = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      const container = containerRef.current
      const content = contentRef.current

      if (!container || !content) return

      const containerWidth = container.clientWidth
      const contentWidth = content.scrollWidth
      const maxDrag = contentWidth - containerWidth

      setConstraints(
        maxDrag > 0 ? { left: -maxDrag, right: 0 } : { left: 0, right: 0 },
      )
    }, 100)
  }, [])

  useEffect(() => {
    updateConstraints()
    const resizeObserver = new ResizeObserver(updateConstraints)

    if (containerRef.current) resizeObserver.observe(containerRef.current)
    if (contentRef.current) resizeObserver.observe(contentRef.current)

    return () => {
      resizeObserver.disconnect()
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [children, updateConstraints])

  useEffect(() => {
    const content = contentRef.current
    if (!content) return

    const imgs = Array.from(content.querySelectorAll("img"))
    imgs.forEach((img) => img.addEventListener("load", updateConstraints))

    return () => {
      imgs.forEach((img) =>
        img.removeEventListener("load", updateConstraints),
      )
    }
  }, [children, updateConstraints])

  const canDrag = constraints.left < 0

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className || ""}`}
      style={{ WebkitUserSelect: "none", userSelect: "none" }}
    >
      <motion.div
        ref={contentRef}
        className={`flex gap-2 ${
          canDrag ? "cursor-grab active:cursor-grabbing" : ""
        }`}
        drag={canDrag ? "x" : false}
        dragConstraints={constraints}
        dragElastic={0.1}
        whileDrag={{ cursor: "grabbing" }}
        onDragStart={() => onDragStateChange?.(true)}
        onDragEnd={() => onDragStateChange?.(false)}
        style={{
          userSelect: "none",
          WebkitUserSelect: "none",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
