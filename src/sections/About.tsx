import { SectionReveal } from "../components/SectionReveal"
import { portfolioData } from "../data/portfolio"

const aboutCards = [
  {
    title: "Formação em andamento",
    description:
      "Estudante de Sistemas de Informação com foco em evolução prática para oportunidades de estágio e nível júnior.",
  },
  {
    title: "Projetos reais",
    description:
      "Construção de APIs, aplicações full stack e experiências com deploy, banco de dados e arquitetura limpa.",
  },
  {
    title: "Objetivo profissional",
    description:
      "Atuar com desenvolvimento back-end e full stack, contribuindo com código limpo, organização e aprendizado contínuo.",
  },
]

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-20">
      <SectionReveal>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
              Sobre mim
            </p>

            <h2 className="text-3xl font-bold leading-tight text-slate-900 dark:text-white md:text-4xl">
              Desenvolvimento com foco em projeto real, arquitetura e evolução
              constante
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              {portfolioData.about.text}
            </p>
          </div>

          <div className="grid gap-4">
            {aboutCards.map((card) => (
              <article
                key={card.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {card.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
