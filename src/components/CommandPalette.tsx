import { useEffect, useMemo, useRef, useState } from "react"
import type { KeyboardEvent, ReactNode } from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  CornerDownLeft,
  FolderGit2,
  Home,
  Layers,
  Mail,
  Moon,
  Search,
  User,
} from "lucide-react"
import { GitHubIcon, LinkedInIcon } from "./BrandIcons"
import { copyToClipboard, paletteStore } from "../lib/store"
import { toggleTheme } from "../hooks/useTheme"
import { portfolioData } from "../data/portfolio"

type Command = {
  id: string
  group: string
  label: string
  hint?: string
  icon: ReactNode
  keywords?: string
  run: () => void
}

function goTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer")
}

const { email, github, linkedin } = portfolioData.contact

const commands: Command[] = [
  { id: "home", group: "Navegar", label: "Início", icon: <Home size={16} />, run: () => goTo("home") },
  { id: "about", group: "Navegar", label: "Sobre mim", icon: <User size={16} />, run: () => goTo("about") },
  { id: "skills", group: "Navegar", label: "Stack e habilidades", icon: <Layers size={16} />, keywords: "tecnologias", run: () => goTo("skills") },
  { id: "projects", group: "Navegar", label: "Projetos", icon: <Code2 size={16} />, keywords: "portfolio repositorios", run: () => goTo("projects") },
  { id: "journey", group: "Navegar", label: "Trajetória e certificações", icon: <BriefcaseBusiness size={16} />, keywords: "experiencia prover formacao", run: () => goTo("journey") },
  { id: "contact", group: "Navegar", label: "Contato", icon: <Mail size={16} />, run: () => goTo("contact") },
  { id: "copy-email", group: "Ações", label: "Copiar e-mail", hint: email, icon: <Mail size={16} />, run: () => copyToClipboard(email, "E-mail copiado!") },
  { id: "theme", group: "Ações", label: "Alternar tema claro/escuro", icon: <Moon size={16} />, keywords: "dark light", run: () => toggleTheme({ x: window.innerWidth / 2, y: window.innerHeight / 2 }) },
  { id: "github", group: "Links", label: "Abrir GitHub", hint: "@martoxm", icon: <GitHubIcon size={16} />, run: () => openExternal(github) },
  { id: "linkedin", group: "Links", label: "Abrir LinkedIn", icon: <LinkedInIcon size={16} />, run: () => openExternal(linkedin) },
  ...portfolioData.projects.map<Command>((project) => ({
    id: `repo-${project.repo}`,
    group: "Projetos",
    label: project.title,
    hint: project.stack.slice(0, 3).join(" · "),
    icon: <FolderGit2 size={16} />,
    keywords: project.stack.join(" "),
    run: () => openExternal(`${github}/${project.repo}`),
  })),
]

function normalize(text: string) {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
}

export function CommandPalette() {
  const open = paletteStore.use()
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        paletteStore.set(!paletteStore.get())
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    if (!open) return
    setQuery("")
    setSelected(0)
    document.body.style.overflow = "hidden"
    requestAnimationFrame(() => inputRef.current?.focus())
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const results = useMemo(() => {
    const terms = normalize(query).split(/\s+/).filter(Boolean)
    if (terms.length === 0) return commands
    return commands.filter((command) => {
      const haystack = normalize(`${command.label} ${command.group} ${command.hint ?? ""} ${command.keywords ?? ""}`)
      return terms.every((term) => haystack.includes(term))
    })
  }, [query])

  function close() {
    paletteStore.set(false)
  }

  function run(command: Command) {
    close()
    // espera o overlay fechar para não brigar com o scroll suave
    setTimeout(command.run, 80)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      close()
    } else if (event.key === "ArrowDown") {
      event.preventDefault()
      setSelected((index) => (index + 1) % Math.max(results.length, 1))
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      setSelected((index) => (index - 1 + results.length) % Math.max(results.length, 1))
    } else if (event.key === "Enter" && results[selected]) {
      event.preventDefault()
      run(results[selected])
    }
  }

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${selected}"]`)?.scrollIntoView({ block: "nearest" })
  }, [selected])

  let lastGroup = ""

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-black/50 px-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => event.target === event.currentTarget && close()}
          onKeyDown={handleKeyDown}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Paleta de comandos"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0.2 }}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-line-strong bg-surface/95 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search size={18} className="shrink-0 text-subtle" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setSelected(0)
                }}
                placeholder="Buscar seções, projetos, ações..."
                aria-label="Buscar comando"
                className="h-14 w-full bg-transparent text-[15px] text-fg outline-none placeholder:text-subtle"
              />
              <span className="kbd">Esc</span>
            </div>

            <div ref={listRef} role="listbox" className="max-h-[min(420px,60vh)] overflow-y-auto p-2">
              {results.length === 0 && (
                <p className="px-3 py-10 text-center text-sm text-muted">
                  Nada encontrado para “{query}”.
                </p>
              )}

              {results.map((command, index) => {
                const showGroup = command.group !== lastGroup
                lastGroup = command.group
                const isSelected = index === selected

                return (
                  <div key={command.id}>
                    {showGroup && (
                      <p className="px-3 pb-1 pt-3 font-mono text-[11px] uppercase tracking-widest text-subtle">
                        {command.group}
                      </p>
                    )}
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      data-index={index}
                      onMouseMove={() => setSelected(index)}
                      onClick={() => run(command)}
                      className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                        isSelected ? "text-fg" : "text-muted"
                      }`}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="palette-highlight"
                          className="absolute inset-0 -z-0 rounded-xl bg-surface-2"
                          transition={{ type: "spring", duration: 0.25, bounce: 0 }}
                        />
                      )}
                      <span className="relative text-subtle">{command.icon}</span>
                      <span className="relative flex-1 truncate">{command.label}</span>
                      {command.hint && (
                        <span className="relative hidden truncate font-mono text-xs text-subtle sm:block">
                          {command.hint}
                        </span>
                      )}
                      {isSelected &&
                        (command.group === "Links" || command.group === "Projetos" ? (
                          <ArrowUpRight size={14} className="relative text-accent" />
                        ) : (
                          <ArrowRight size={14} className="relative text-accent" />
                        ))}
                    </button>
                  </div>
                )
              })}
            </div>

            <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[11px] text-subtle">
              <span className="flex items-center gap-1.5">
                <span className="kbd">↑</span>
                <span className="kbd">↓</span> navegar
              </span>
              <span className="flex items-center gap-1.5">
                <span className="kbd">
                  <CornerDownLeft size={10} />
                </span>
                selecionar
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
