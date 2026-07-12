import { portfolioData } from "../data/portfolio"
import { SectionReveal } from "../components/SectionReveal"
import { ProjectCard } from "../components/ProjectCard"
import { useGitHubRepos } from "../hooks/useGitHubRepos"

export function Projects() {
  const { repos, loading, error } = useGitHubRepos(portfolioData.githubUsername)

  const sortedRepos = [...repos].sort((a, b) => {
    const featured = portfolioData.featuredProjects

    const indexA = featured.findIndex(
      (name) => name.toLowerCase() === a.name.toLowerCase(),
    )
    const indexB = featured.findIndex(
      (name) => name.toLowerCase() === b.name.toLowerCase(),
    )

    const aIsFeatured = indexA !== -1
    const bIsFeatured = indexB !== -1

    if (aIsFeatured && bIsFeatured) return indexA - indexB
    if (aIsFeatured) return -1
    if (bIsFeatured) return 1

    return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
  })

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-20">
      <SectionReveal>
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            Projetos
          </p>

          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Projetos selecionados e conectados ao GitHub
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Esta seção combina automação com curadoria: seus projetos públicos
            são carregados pela API do GitHub, mas os repositórios mais
            estratégicos aparecem primeiro.
          </p>
        </div>
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

      {!loading && !error && sortedRepos.length > 0 && (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {sortedRepos.slice(0, 6).map((repo) => (
            <ProjectCard
              key={repo.id}
              repo={repo}
              featured={portfolioData.featuredProjects.some(
                (name) => name.toLowerCase() === repo.name.toLowerCase(),
              )}
            />
          ))}
        </div>
      )}

      {!loading && !error && sortedRepos.length === 0 && (
        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          Nenhum repositório público encontrado.
        </div>
      )}
    </section>
  )
}
