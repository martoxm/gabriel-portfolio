import { useMemo, useState } from "react"
import type { PointerEvent } from "react"
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { ArrowUpRight, GitFork, Star } from "lucide-react"
import { SectionHeading } from "../components/SectionHeading"
import { GitHubIcon } from "../components/BrandIcons"
import { portfolioData } from "../data/portfolio"
import type { Project } from "../data/portfolio"
import { useGitHubRepos } from "../hooks/useGitHubRepos"
import type { GitHubRepo } from "../types/github"

const filters = [
  { id: "all", label: "Todos" },
  { id: "ia", label: "IA" },
  { id: "fullstack", label: "Full Stack" },
  { id: "backend", label: "Back-end" },
  { id: "frontend", label: "Front-end" },
] as const

type FilterId = (typeof filters)[number]["id"]

const relativeTime = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" })

function formatUpdated(date: string) {
  const days = Math.round((new Date(date).getTime() - Date.now()) / 86_400_000)
  if (Math.abs(days) < 30) return relativeTime.format(days, "day")
  return relativeTime.format(Math.round(days / 30), "month")
}

function ProjectCard({ project, repo, large }: { project: Project; repo?: GitHubRepo; large: boolean }) {
  const { github } = portfolioData.contact
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)
  const glare = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(500px circle at ${x}% ${y}%, var(--glow), transparent 45%)`,
  )

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    rotateY.set((px - 0.5) * 8)
    rotateX.set((0.5 - py) * 8)
    glareX.set(px * 100)
    glareY.set(py * 100)
  }

  function handlePointerLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }

  const demo = project.demo ?? repo?.homepage ?? undefined

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface p-7 transition-colors hover:border-line-strong ${
        large ? "md:col-span-2" : ""
      }`}
    >
      <motion.div aria-hidden="true" style={{ background: glare }} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          {project.highlight && (
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-accent">
              ✦ {project.highlight}
            </span>
          )}
          <h3 className={`font-semibold tracking-tight text-fg ${large ? "text-2xl md:text-3xl" : "text-xl"}`}>
            {project.title}
          </h3>
          <p className="mt-1 font-mono text-xs text-subtle">{project.repo}</p>
        </div>

        <a
          href={`${github}/${project.repo}`}
          target="_blank"
          rel="noreferrer"
          aria-label={`Repositório de ${project.title}`}
          className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-muted transition group-hover:rotate-45 group-hover:border-accent/50 group-hover:text-accent"
        >
          <ArrowUpRight size={18} />
        </a>
      </div>

      <p className={`relative mt-5 leading-7 text-muted ${large ? "max-w-2xl text-base" : "text-sm"}`}>
        {project.description}
      </p>

      <div className="relative mt-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span key={tech} className="chip">
            {tech}
          </span>
        ))}
      </div>

      <div className="relative mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-7 text-sm text-subtle">
        {repo && (
          <>
            <span className="flex items-center gap-1.5">
              <Star size={14} /> {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1.5">
              <GitFork size={14} /> {repo.forks_count}
            </span>
            <span className="font-mono text-xs">atualizado {formatUpdated(repo.pushed_at)}</span>
          </>
        )}

        <div className="ml-auto flex gap-2">
          <a
            href={`${github}/${project.repo}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center gap-2 rounded-full border border-line px-4 text-xs font-medium text-fg transition hover:bg-surface-2"
          >
            <GitHubIcon size={14} /> Código
          </a>
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-fg px-4 text-xs font-medium text-bg transition hover:opacity-90"
            >
              Demo <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export function Projects() {
  const [filter, setFilter] = useState<FilterId>("all")
  const { repos } = useGitHubRepos(portfolioData.githubUsername)
  const { projects } = portfolioData

  const reposByName = useMemo(
    () => new Map(repos.map((repo) => [repo.name.toLowerCase(), repo])),
    [repos],
  )

  const visible = projects.filter((project) => filter === "all" || project.category === filter)

  const otherRepos = repos.filter(
    (repo) =>
      !projects.some((project) => project.repo.toLowerCase() === repo.name.toLowerCase()) &&
      repo.name.toLowerCase() !== portfolioData.githubUsername,
  )

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-28">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          index="03"
          eyebrow="Projetos"
          title="Coisas que construí"
          description="Projetos reais, do domínio ao deploy. Estrelas e atualizações vêm ao vivo da API do GitHub."
        />

        <div role="tablist" aria-label="Filtrar projetos" className="reveal flex flex-wrap gap-1 rounded-full border border-line bg-surface p-1">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={filter === item.id}
              onClick={() => setFilter(item.id)}
              className={`relative rounded-full px-4 py-1.5 text-sm transition-colors ${
                filter === item.id ? "text-bg" : "text-muted hover:text-fg"
              }`}
            >
              {filter === item.id && (
                <motion.span layoutId="project-filter" className="absolute inset-0 rounded-full bg-fg" transition={{ type: "spring", bounce: 0.2, duration: 0.4 }} />
              )}
              <span className="relative">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="mt-14 grid gap-4 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((project, index) => (
            <ProjectCard
              key={project.repo}
              project={project}
              repo={reposByName.get(project.repo.toLowerCase())}
              large={filter === "all" && index === 0}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {otherRepos.length > 0 && (
        <div className="reveal mt-16">
          <p className="font-mono text-sm text-subtle">Outros repositórios</p>
          <div className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {otherRepos.slice(0, 6).map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col gap-2 bg-surface p-5 transition hover:bg-surface-2"
              >
                <span className="flex items-center justify-between gap-2 font-mono text-sm text-fg">
                  <span className="truncate">{repo.name}</span>
                  <ArrowUpRight size={14} className="shrink-0 text-subtle transition group-hover:text-accent" />
                </span>
                <span className="line-clamp-2 text-xs leading-5 text-muted">
                  {repo.description ?? "Sem descrição."}
                </span>
                {repo.language && <span className="mt-auto pt-1 font-mono text-[11px] text-subtle">{repo.language}</span>}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="reveal mt-10 flex justify-center">
        <a
          href={portfolioData.contact.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-muted transition hover:border-line-strong hover:text-fg"
        >
          <GitHubIcon size={16} /> Ver tudo no GitHub <ArrowUpRight size={14} />
        </a>
      </div>
    </section>
  )
}
