import { portfolioData } from "../data/portfolio"
import { SectionReveal } from "../components/SectionReveal"

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-20">
      <SectionReveal>
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            Sobre mim
          </p>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Construindo base forte para atuar com desenvolvimento full stack
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            {portfolioData.about.text}
          </p>
        </div>
      </SectionReveal>
    </section>
  )
}
