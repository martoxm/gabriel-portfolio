import { motion } from "motion/react"
import type { GitHubRepo } from "../types/github"

type ProjectCardProps = {
  repo: GitHubRepo
  featured?: boolean
}

export function ProjectCard({ repo, featured = false }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
      className={`rounded-3xl border p-6 shadow-sm transition dark:bg-slate-900 ${
        featured
          ? "border-indigo-300 bg-indigo-50/40 dark:border-indigo-500/40"
          : "border-slate-200 bg-white dark:border-slate-800"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          {featured && (
            <span className="mb-3 inline-flex rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white">
              Destaque
            </span>
          )}

          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            {repo.name}
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
            {repo.description || "Projeto sem descrição cadastrada no GitHub."}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {repo.language && (
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
            {repo.language}
          </span>
        )}

        {repo.topics?.slice(0, 3).map((topic) => (
          <span
            key={topic}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-300"
          >
            {topic}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
        <span>⭐ {repo.stargazers_count}</span>
        <span>⑂ {repo.forks_count}</span>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          Repositório
        </a>

        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
          >
            Demo
          </a>
        )}
      </div>
    </motion.article>
  )
}
