import { SectionReveal } from "../components/SectionReveal"
import { portfolioData } from "../data/portfolio"

const strengths = [
  "Liderança de equipe",
  "Organização de processos",
  "Comunicação",
  "Resolução de problemas",
]

export function Experience() {
  const { role, company, period, description } = portfolioData.experience

  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-20">
      <SectionReveal>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
              Experiência
            </p>

            <h2 className="text-3xl font-bold leading-tight text-slate-900 dark:text-white md:text-4xl">
              Experiência profissional e competências transferíveis
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              Minha trajetória profissional também fortaleceu disciplina, visão
              operacional, comunicação e tomada de decisão — qualidades que levo
              para o desenvolvimento de software.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                {role} · {company}
              </h3>

              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {period}
              </span>
            </div>

            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              {description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {strengths.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
