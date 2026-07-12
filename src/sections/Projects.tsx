import { portfolioData } from "../data/portfolio"
import { SectionReveal } from "../components/SectionReveal"
import { ProjectCard } from "../components/ProjectCard"
import { useGitHubRepos } from "../hooks/useGitHubRepos"

export function Projects() {
  const { repos, loading, error } = useGitHubRepos(portfolioData.githubUsername)

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-20">
      <SectionReveal>
        <>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            Projetos
          </p>

          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Projetos conectados ao GitHub
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Esta seção busca automaticamente seus repositórios públicos no
            GitHub e mantém o portfólio mais vivo, atualizado e profissional.
          </p>
        </>
      </SectionReveal>

      {loading && (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="h-6 w-40 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="mt-4 h-4 w-full rounded bg-slate-200 dark:bg-slate-700" />
              <div className="mt-2 h-4 w-5/6 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="mt-6 h-10 w-28 rounded-full bg-slate-200 dark:bg-slate-700" />
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="mt-10 rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
          {error}
        </div>
      )}

      {!loading && !error && repos.length > 0 && (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {repos.slice(0, 6).map((repo) => (
            <ProjectCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}

      {!loading && !error && repos.length === 0 && (
        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          Nenhum repositório público encontrado.
        </div>
      )}
    </section>
  )
}
