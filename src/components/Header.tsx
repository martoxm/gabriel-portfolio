import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"
import { useActiveSection } from "../hooks/useActiveSection"

const navItems = [
  { label: "Início", href: "#home", id: "home" },
  { label: "Sobre", href: "#about", id: "about" },
  { label: "Habilidades", href: "#skills", id: "skills" },
  { label: "Projetos", href: "#projects", id: "projects" },
  { label: "Experiência", href: "#experience", id: "experience" },
  { label: "Contato", href: "#contact", id: "contact" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const activeSection = useActiveSection()

  function handleCloseMenu() {
    setIsOpen(false)
  }

  function toggleMenu() {
    setIsOpen((prev) => !prev)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <motion.a
          href="#home"
          whileHover={{ y: -2 }}
          className="text-sm font-semibold tracking-wide text-slate-900 dark:text-slate-100"
        >
          Marto.dev
        </motion.a>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.id

            return (
              <a
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                    : "text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex rounded-full border border-slate-300 p-2 text-slate-700 transition hover:bg-slate-100 md:hidden dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="border-t border-slate-200 bg-white px-4 py-4 md:hidden dark:border-slate-800 dark:bg-slate-950"
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={handleCloseMenu}
                    className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
                    }`}
                  >
                    {item.label}
                  </a>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
