import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { BrainCircuit, Cloud, Monitor, Server } from "lucide-react"
import type { ReactNode } from "react"
import { SectionHeading } from "../components/SectionHeading"
import { SpotlightCard } from "../components/SpotlightCard"
import { portfolioData } from "../data/portfolio"

const icons: Record<string, ReactNode> = {
  backend: <Server size={18} />,
  frontend: <Monitor size={18} />,
  ia: <BrainCircuit size={18} />,
  cloud: <Cloud size={18} />,
}

export function Skills() {
  const groups = portfolioData.skillGroups
  const [activeId, setActiveId] = useState(groups[0].id)
  const active = groups.find((group) => group.id === activeId) ?? groups[0]

  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-28">
      <SectionHeading
        index="02"
        eyebrow="Stack"
        title="Ferramentas que uso para tirar ideias do papel"
        description="Base forte em .NET no back-end, React no front e uma camada crescente de IA e automação — tudo pensado para rodar em produção."
      />

      <div className="reveal mt-14 grid gap-4 lg:grid-cols-[320px_1fr]">
        <div role="tablist" aria-label="Áreas" className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
          {groups.map((group) => {
            const isActive = group.id === activeId
            return (
              <button
                key={group.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(group.id)}
                onMouseEnter={() => setActiveId(group.id)}
                className={`relative flex shrink-0 items-center gap-3 rounded-2xl border px-5 py-4 text-left transition-colors lg:w-full ${
                  isActive ? "border-line-strong text-fg" : "border-line text-muted hover:text-fg"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="skill-tab"
                    className="absolute inset-0 rounded-2xl bg-surface-2"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
                  />
                )}
                <span className={`relative ${isActive ? "text-accent" : ""}`}>{icons[group.id]}</span>
                <span className="relative font-medium">{group.label}</span>
                <span className="relative ml-auto hidden font-mono text-xs text-subtle lg:inline">
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </button>
            )
          })}
        </div>

        <SpotlightCard role="tabpanel" className="min-h-[320px] p-7 md:p-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <p className="font-mono text-sm text-accent">~/stack/{active.id}</p>
              <p className="mt-3 max-w-lg text-xl font-medium leading-8 text-fg">{active.description}</p>

              <motion.ul
                className="mt-8 flex flex-wrap gap-3"
                initial="hidden"
                animate="show"
                transition={{ staggerChildren: 0.04 }}
              >
                {active.items.map((item) => (
                  <motion.li
                    key={item}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8, y: 8 },
                      show: { opacity: 1, scale: 1, y: 0 },
                    }}
                    whileHover={{ y: -3 }}
                    className="rounded-xl border border-line bg-surface-2 px-4 py-2.5 text-sm font-medium text-fg shadow-sm transition-colors hover:border-accent/50"
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </AnimatePresence>
        </SpotlightCard>
      </div>
    </section>
  )
}
