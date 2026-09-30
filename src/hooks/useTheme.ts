import { useSyncExternalStore } from "react"
import { flushSync } from "react-dom"

type Theme = "light" | "dark"

const listeners = new Set<() => void>()

function readTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark")
  try {
    localStorage.setItem("theme", theme)
  } catch {
    // storage indisponível (modo privado): o tema só não persiste
  }
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/**
 * Alterna o tema. Quando o navegador suporta View Transitions, a nova paleta
 * surge como um círculo que se expande a partir do ponto de origem (x, y).
 */
export function toggleTheme(origin?: { x: number; y: number }) {
  const next: Theme = readTheme() === "dark" ? "light" : "dark"
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  if (!document.startViewTransition || reduceMotion) {
    applyTheme(next)
    return
  }

  const x = origin?.x ?? window.innerWidth - 40
  const y = origin?.y ?? 40
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

  const transition = document.startViewTransition(() => {
    flushSync(() => applyTheme(next))
  })

  transition.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 550, easing: "cubic-bezier(.4,0,.2,1)", pseudoElement: "::view-transition-new(root)" },
    )
  })
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "dark" as Theme)
  return { theme, toggleTheme }
}
