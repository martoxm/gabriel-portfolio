import { portfolioData } from "../data/portfolio"

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-20">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
        Habilidades
      </p>
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
        Tecnologias e ferramentas
      </h2>

      <div className="mt-8 flex flex-wrap gap-3">
        {portfolioData.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}
