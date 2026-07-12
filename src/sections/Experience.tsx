import { portfolioData } from "../data/portfolio"

export function Experience() {
  const { role, company, period, description } = portfolioData.experience

  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-20">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
        Experiência
      </p>
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
        Experiência profissional
      </h2>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            {role} · {company}
          </h3>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {period}
          </span>
        </div>

        <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
          {description}
        </p>
      </div>
    </section>
  )
}
