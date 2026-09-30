import { useEffect, useRef, useState } from "react"
import type { FormEvent, KeyboardEvent, ReactNode } from "react"
import { portfolioData } from "../data/portfolio"
import { toggleTheme } from "../hooks/useTheme"
import { copyToClipboard, paletteStore } from "../lib/store"
import { SpotlightCard } from "./SpotlightCard"

type Line = { id: number; kind: "input" | "output"; content: ReactNode }

const { hero, contact, skillGroups, projects, timeline, certifications } = portfolioData

const Accent = ({ children }: { children: ReactNode }) => <span className="text-accent">{children}</span>
const Dim = ({ children }: { children: ReactNode }) => <span className="text-subtle">{children}</span>
const Ok = ({ children }: { children: ReactNode }) => <span className="text-ok">{children}</span>

const commandList: Record<string, { description: string; output: () => ReactNode }> = {
  help: {
    description: "lista os comandos",
    output: () => (
      <div className="grid grid-cols-[auto_1fr] gap-x-4">
        {Object.entries(commandList).map(([name, command]) => (
          <div key={name} className="contents">
            <Accent>{name}</Accent>
            <Dim>{command.description}</Dim>
          </div>
        ))}
      </div>
    ),
  },
  whoami: {
    description: "quem sou eu",
    output: () => (
      <>
        <p>
          <Ok>{hero.name}</Ok> — {hero.role} @ {hero.company}
        </p>
        <Dim>C# · .NET · React · TypeScript · IA · {contact.location}</Dim>
      </>
    ),
  },
  stack: {
    description: "tecnologias por área",
    output: () =>
      skillGroups.map((group) => (
        <p key={group.id}>
          <Accent>{group.label.padEnd(15, " ")}</Accent>
          {group.items.slice(0, 5).join(", ")}
        </p>
      )),
  },
  projetos: {
    description: "projetos em destaque",
    output: () =>
      projects.slice(0, 4).map((project) => (
        <p key={project.repo}>
          <Ok>▸</Ok>{" "}
          <a className="underline decoration-line-strong underline-offset-4 hover:text-accent" href={`${contact.github}/${project.repo}`} target="_blank" rel="noreferrer">
            {project.title}
          </a>{" "}
          <Dim>{project.stack.slice(0, 3).join(" · ")}</Dim>
        </p>
      )),
  },
  exp: {
    description: "trajetória profissional",
    output: () =>
      timeline.map((item) => (
        <p key={item.title}>
          <Dim>{item.period.padEnd(20, " ")}</Dim>
          {item.title} <Accent>@ {item.org.split(" ")[0]}</Accent>
          {item.current && <Ok> ● atual</Ok>}
        </p>
      )),
  },
  certs: {
    description: "certificações",
    output: () =>
      certifications.map((cert) => (
        <p key={cert.title}>
          <Ok>✓</Ok> {cert.title} <Dim>— {cert.issuer}</Dim>
        </p>
      )),
  },
  contato: {
    description: "copia meu e-mail",
    output: () => {
      copyToClipboard(contact.email, "E-mail copiado!")
      return (
        <p>
          {contact.email} <Ok>(copiado!)</Ok>
        </p>
      )
    },
  },
  tema: {
    description: "alterna claro/escuro",
    output: () => {
      setTimeout(() => toggleTheme(), 50)
      return <Dim>trocando tema...</Dim>
    },
  },
  menu: {
    description: "abre a paleta (Ctrl+K)",
    output: () => {
      setTimeout(() => paletteStore.set(true), 50)
      return <Dim>abrindo paleta de comandos...</Dim>
    },
  },
  clear: { description: "limpa o terminal", output: () => null },
}

const suggestions = ["whoami", "stack", "projetos", "exp"]

let lineId = 0
const nextId = () => ++lineId

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([])
  const [value, setValue] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [booting, setBooting] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const bootedRef = useRef(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  function execute(raw: string) {
    const name = raw.trim().toLowerCase()
    if (!name) return

    setHistory((prev) => [name, ...prev])
    setHistoryIndex(-1)

    if (name === "clear") {
      setLines([])
      return
    }

    const command = commandList[name]
    const output =
      name === "sudo" || name.startsWith("sudo ") ? (
        <Dim>boa tentativa 😄 permissão negada.</Dim>
      ) : command ? (
        command.output()
      ) : (
        <p>
          comando não encontrado: <Accent>{name}</Accent>. Digite <Accent>help</Accent>.
        </p>
      )

    setLines((prev) => [
      ...prev,
      { id: nextId(), kind: "input", content: name },
      { id: nextId(), kind: "output", content: output },
    ])
  }

  // "digita" o whoami na primeira renderização
  useEffect(() => {
    if (bootedRef.current) return
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const text = "whoami"
    let index = 0
    let timer: ReturnType<typeof setTimeout>

    function type() {
      index++
      setValue(text.slice(0, index))
      if (index < text.length) {
        timer = setTimeout(type, 90)
      } else {
        timer = setTimeout(() => {
          setValue("")
          bootedRef.current = true
          execute(text)
          setBooting(false)
        }, 350)
      }
    }

    if (reduceMotion) {
      bootedRef.current = true
      execute(text)
      setBooting(false)
    } else {
      timer = setTimeout(type, 900)
    }

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const element = scrollRef.current
    if (element) element.scrollTop = element.scrollHeight
  }, [lines])

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    execute(value)
    setValue("")
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp") {
      event.preventDefault()
      const index = Math.min(historyIndex + 1, history.length - 1)
      if (history[index]) {
        setHistoryIndex(index)
        setValue(history[index])
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault()
      const index = historyIndex - 1
      setHistoryIndex(Math.max(index, -1))
      setValue(index >= 0 ? history[index] : "")
    } else if (event.key === "Tab") {
      const match = Object.keys(commandList).find((name) => value && name.startsWith(value.toLowerCase()))
      if (match) {
        event.preventDefault()
        setValue(match)
      }
    } else if (event.key === "l" && event.ctrlKey) {
      event.preventDefault()
      setLines([])
    }
  }

  return (
    <SpotlightCard className="overflow-hidden rounded-2xl! shadow-2xl shadow-accent/10">
      <div className="flex items-center gap-2 border-b border-line bg-surface-2/60 px-4 py-3">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-xs text-subtle">gabriel@marto.dev: ~</span>
      </div>

      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        className="h-[300px] cursor-text overflow-y-auto p-4 font-mono text-[13px] leading-6 text-fg/90 sm:h-[340px]"
      >
        <p className="text-subtle">
          Bem-vindo(a)! Digite <Accent>help</Accent> para ver os comandos.
        </p>

        {lines.map((line) =>
          line.kind === "input" ? (
            <p key={line.id} className="mt-3">
              <Ok>➜</Ok> <Accent>~</Accent> {line.content}
            </p>
          ) : (
            <div key={line.id} className="whitespace-pre-wrap">
              {line.content}
            </div>
          ),
        )}

        <form onSubmit={handleSubmit} className="mt-3 flex items-center gap-2">
          <Ok>➜</Ok>
          <Accent>~</Accent>
          <input
            ref={inputRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={handleKeyDown}
            readOnly={booting}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            aria-label="Comando do terminal"
            className="min-w-0 flex-1 bg-transparent text-fg caret-accent outline-none"
          />
        </form>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-line px-4 py-3">
        {suggestions.map((name) => (
          <button
            key={name}
            type="button"
            disabled={booting}
            onClick={() => execute(name)}
            className="chip transition hover:border-accent/50 hover:text-fg disabled:opacity-50"
          >
            {name}
          </button>
        ))}
      </div>
    </SpotlightCard>
  )
}
