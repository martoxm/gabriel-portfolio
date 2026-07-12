import type { ReactNode, MouseEvent } from "react"
import { useRef } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

type MagneticButtonProps = {
  children: ReactNode
  href: string
  className?: string
}

export function MagneticButton({
  children,
  href,
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | null>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 220, damping: 18 })
  const springY = useSpring(y, { stiffness: 220, damping: 18 })

  function handleMouseMove(event: MouseEvent<HTMLAnchorElement>) {
    const element = ref.current
    if (!element) return

    const rect = element.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const offsetX = event.clientX - rect.left - width / 2
    const offsetY = event.clientY - rect.top - height / 2

    x.set(offsetX * 0.2)
    y.set(offsetY * 0.2)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
      className={className}
    >
      {children}
    </motion.a>
  )
}
