import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Command, Menu, Search, X } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"
import { useActiveSection } from "../hooks/useActiveSection"
import { paletteStore } from "../lib/store"

const navItems = [
  { label: "Sobre", id: "about" },
  { label: "Stack", id: "skills" },
  { label: "Projetos", id: "projects" },
  { label: "Trajetória", id: "journey" },
  { label: "Contato", id: "contact" },
]

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.userAgent)

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const activeSection = useActiveSection()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div className="scroll-progress fixed inset-x-0 top-0 h-0.5 bg-linear-to-r from-accent to-accent-2" />

      <div
        className={`mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-full border px-3 py-2 transition-all duration-300 ${
          scrolled || isOpen
            ? "border-line bg-bg/70 shadow-lg shadow-black/5 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <a href="#home" className="group flex items-center gap-2 pl-2 font-mono text-sm font-medium text-fg">
          <span className="grid size-7 place-items-center rounded-lg bg-fg text-xs font-bold text-bg transition group-hover:rotate-6">
            G
          </span>
          marto<span className="-ml-2 text-accent">.dev</span>
        </a>

        <nav className="hidden items-center md:flex" aria-label="Seções">
          {navItems.map((item) => {
            const isActive = activeSection === item.id

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative rounded-full px-4 py-1.5 text-sm transition-colors ${
                  isActive ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border border-line bg-surface-2"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => paletteStore.set(true)}
            className="hidden h-9 items-center gap-2 rounded-full border border-line bg-surface-2 pl-3 pr-2 text-xs text-muted transition hover:border-line-strong hover:text-fg sm:flex"
            aria-label="Abrir paleta de comandos"
          >
            <Search size={14} />
            Buscar
            <span className="kbd">
              {isMac ? <Command size={10} /> : "Ctrl"} K
            </span>
          </button>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="grid size-9 place-items-center rounded-full border border-line bg-surface-2 text-muted md:hidden"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 flex max-w-5xl flex-col gap-1 rounded-3xl border border-line bg-bg/90 p-2 backdrop-blur-xl md:hidden"
            aria-label="Seções"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsOpen(false)}
                className={`rounded-2xl px-4 py-3 text-sm transition ${
                  activeSection === item.id ? "bg-surface-2 text-fg" : "text-muted"
                }`}
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setIsOpen(false)
                paletteStore.set(true)
              }}
              className="flex items-center gap-2 rounded-2xl px-4 py-3 text-left text-sm text-muted"
            >
              <Search size={14} /> Buscar comandos
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
