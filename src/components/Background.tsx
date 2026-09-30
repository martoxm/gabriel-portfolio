import { useEffect, useRef } from "react"

export function Background() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0

    function handlePointerMove(event: PointerEvent) {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        ref.current?.style.setProperty("--mx", `${event.clientX}px`)
        ref.current?.style.setProperty("--my", `${event.clientY}px`)
      })
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", handlePointerMove)
    }
  }, [])

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0" />
      <div className="bg-spotlight absolute inset-0" />
      <div className="absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />
      <div className="absolute top-[40%] -right-40 h-[360px] w-[360px] rounded-full bg-accent-2/10 blur-[120px]" />
    </div>
  )
}
