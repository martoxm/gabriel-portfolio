import { SectionReveal } from "../components/SectionReveal"
import { MagneticButton } from "../components/MagneticButton"

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20">
      <SectionReveal>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            Contato
          </p>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Vamos construir algo incrível
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Estou em transição para oportunidades de estágio ou nível júnior em
            desenvolvimento full stack, com foco em back-end .NET, front-end com
            React e projetos modernos para web.
          </p>

          <div className="mt-8">
            <MagneticButton
              href="mailto:seuemail@exemplo.com"
              className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Falar comigo
            </MagneticButton>
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
