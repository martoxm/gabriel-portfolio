import { SectionReveal } from "../components/SectionReveal"
import { MagneticButton } from "../components/MagneticButton"

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20">
      <SectionReveal>
        <div className="rounded-4xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            Contato
          </p>

          <h2 className="text-3xl font-bold leading-tight text-slate-900 dark:text-white md:text-4xl">
            Buscando oportunidades para crescer, aprender e construir projetos
            relevantes
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Estou em transição para oportunidades de estágio ou nível júnior em
            desenvolvimento full stack, com foco em back-end .NET, front-end com
            React e projetos modernos para web.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <MagneticButton
              href="mailto:gabriel.martorelli@hotmail.com"
              className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Falar comigo
            </MagneticButton>

            <a
              href="https://github.com/martoxm"
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
            >
              Ver GitHub
            </a>
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
