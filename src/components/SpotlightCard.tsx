import type { ComponentPropsWithoutRef, PointerEvent } from "react"

type SpotlightCardProps = ComponentPropsWithoutRef<"div">

export function SpotlightCard({ className = "", onPointerMove, ...props }: SpotlightCardProps) {
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`)
    onPointerMove?.(event)
  }

  return (
    <div
      {...props}
      onPointerMove={handlePointerMove}
      className={`spotlight rounded-3xl ${className}`}
    />
  )
}
