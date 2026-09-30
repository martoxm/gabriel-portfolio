import { useEffect, useState } from "react"
import { BrainCircuit, BriefcaseBusiness, Clock, Cloud, GraduationCap, Languages } from "lucide-react"
import { SectionHeading } from "../components/SectionHeading"
import { SpotlightCard } from "../components/SpotlightCard"
import { portfolioData } from "../data/portfolio"

function useRioTime() {
  const format = () =>
    new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Sao_Paulo",
    }).format(new Date())

  const [time, setTime] = useState(format)

  useEffect(() => {
    const timer = setInterval(() => setTime(format()), 15_000)
    return () => clearInterval(timer)
  }, [])

  return time
}

export function About() {
  const { headline, paragraphs, stats } = portfolioData.about
  const { hero, languages } = portfolioData
  const time = useRioTime()

  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-28">
      <SectionHeading index="01" eyebrow="Sobre mim" title={headline} />

      <div className="mt-14 grid auto-rows-[minmax(0,auto)] gap-4 md:grid-cols-6">
        <SpotlightCard className="reveal p-7 md:col-span-4 md:row-span-2 md:p-9">
          <div className="space-y-5 text-[17px] leading-8 text-muted">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-gradient text-3xl font-semibold tracking-tight sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-xs leading-5 text-subtle sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </SpotlightCard>

        <SpotlightCard className="reveal p-6 md:col-span-2">
          <div className="flex items-center justify-between">
            <BriefcaseBusiness size={20} className="text-accent" />
            <span className="chip border-ok/30! bg-ok/10! text-ok!">● agora</span>
          </div>
          <p className="mt-6 text-sm text-subtle">Trabalhando como</p>
          <p className="mt-1 text-lg font-semibold text-fg">{hero.role}</p>
          <p className="text-sm text-muted">{hero.company} · Remoto</p>
        </SpotlightCard>

        <SpotlightCard className="reveal p-6 md:col-span-2">
          <BrainCircuit size={20} className="text-accent" />
          <p className="mt-6 text-sm text-subtle">Explorando</p>
          <p className="mt-1 text-lg font-semibold text-fg">Agentes de IA & RAG</p>
          <p className="text-sm text-muted">n8n, LangGraph, Qdrant, Cohere</p>
        </SpotlightCard>

        <SpotlightCard className="reveal p-6 md:col-span-2">
          <GraduationCap size={20} className="text-accent" />
          <p className="mt-6 text-sm text-subtle">Formação</p>
          <p className="mt-1 text-lg font-semibold text-fg">Sistemas de Informação</p>
          <p className="text-sm text-muted">Estácio · 2026 — 2029</p>
        </SpotlightCard>

        <SpotlightCard className="reveal p-6 md:col-span-2">
          <Cloud size={20} className="text-accent" />
          <p className="mt-6 text-sm text-subtle">Deploy</p>
          <p className="mt-1 text-lg font-semibold text-fg">Azure · Docker · OCI</p>
          <p className="text-sm text-muted">Nginx, HTTPS, Systemd e proxy reverso</p>
        </SpotlightCard>

        <SpotlightCard className="reveal flex flex-col justify-between p-6 md:col-span-2">
          <div className="flex items-center justify-between">
            <Clock size={20} className="text-accent" />
            <span className="font-mono text-xs text-subtle">Rio de Janeiro</span>
          </div>
          <p className="mt-6 font-mono text-4xl font-medium tracking-tight text-fg tabular-nums">{time}</p>
          <p className="text-sm text-muted">Horário de Brasília (UTC−3)</p>
        </SpotlightCard>

        <SpotlightCard className="reveal p-6 md:col-span-6 lg:col-span-6">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="flex items-center gap-2 text-sm text-subtle">
              <Languages size={18} className="text-accent" /> Idiomas
            </span>
            {languages.map((language) => (
              <span key={language.name} className="text-sm text-fg">
                {language.name} <span className="text-muted">· {language.level}</span>
              </span>
            ))}
          </div>
        </SpotlightCard>
      </div>
    </section>
  )
}
