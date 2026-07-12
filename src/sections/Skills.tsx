import { SectionReveal } from "../components/SectionReveal"
import { portfolioData } from "../data/portfolio"

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-20">
      <SectionReveal>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
              Habilidades
            </p>

            <h2 className="text-3xl font-bold leading-tight text-slate-900 dark:text-white md:text-4xl">
              Tecnologias que sustentam minha construção como full stack
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              Minha base atual combina back-end com .NET, construção de APIs,
              banco de dados, front-end com React e práticas modernas de
              desenvolvimento.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {portfolioData.skills.map((skill) => (
              <article
                key={skill}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/40"
              >
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {skill}
                </p>
              </article>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
