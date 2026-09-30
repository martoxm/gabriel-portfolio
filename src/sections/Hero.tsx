import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowDown, Mail } from "lucide-react"
import { portfolioData } from "../data/portfolio"
import { MagneticButton } from "../components/MagneticButton"
import { Terminal } from "../components/Terminal"
import { GitHubIcon, LinkedInIcon } from "../components/BrandIcons"

const marqueeItems = [
  "C#", ".NET 10", "ASP.NET Core", "React 19", "TypeScript", "Next.js", "SQL",
  "Entity Framework", "Docker", "Nginx", "Oracle Cloud", "n8n", "RAG", "Qdrant", "LangGraph", "Tailwind CSS",
]

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
}

function RotatingWord({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % words.length), 2400)
    return () => clearInterval(timer)
  }, [words.length])

  return (
    <span className="relative inline-grid align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
          className="text-gradient col-start-1 row-start-1 whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export function Hero() {
  const { name, role, company, status, subtitle, rotatingWords } = portfolioData.hero
  const { github, linkedin } = portfolioData.contact

  return (
    <section id="home" className="relative flex min-h-svh flex-col justify-center pt-28 pb-10">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-4 lg:grid-cols-[1.15fr_1fr]">
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
        >
          <motion.a
            variants={fadeUp}
            href="#journey"
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 py-1 pl-1.5 pr-3 text-xs text-muted backdrop-blur transition hover:border-line-strong hover:text-fg"
          >
            <span className="flex items-center gap-1.5 rounded-full bg-ok/10 px-2 py-0.5 font-medium text-ok">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-ok" />
              </span>
              Novo
            </span>
            {status}
            <span className="transition group-hover:translate-x-0.5">→</span>
          </motion.a>

          <motion.p variants={fadeUp} className="mt-8 font-mono text-sm text-muted">
            Olá, eu sou
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-2 text-5xl font-semibold tracking-tighter text-fg sm:text-6xl lg:text-7xl"
          >
            {name}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-2xl font-medium tracking-tight text-muted sm:text-3xl"
          >
            {role} que constrói <RotatingWord words={rotatingWords} />
          </motion.p>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            {subtitle}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticButton
              href="#projects"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-fg px-6 text-sm font-medium text-bg shadow-lg shadow-accent/20 transition hover:opacity-90"
            >
              Ver projetos
              <ArrowDown size={16} />
            </MagneticButton>

            <MagneticButton
              href="#contact"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong bg-surface/60 px-6 text-sm font-medium text-fg backdrop-blur transition hover:bg-surface-2"
            >
              <Mail size={16} />
              Vamos conversar
            </MagneticButton>

            <div className="ml-1 flex items-center gap-1">
              <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid size-11 place-items-center rounded-full text-muted transition hover:bg-surface-2 hover:text-fg">
                <GitHubIcon />
              </a>
              <a href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid size-11 place-items-center rounded-full text-muted transition hover:bg-surface-2 hover:text-fg">
                <LinkedInIcon />
              </a>
            </div>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-8 font-mono text-xs text-subtle">
            {company} · {portfolioData.contact.location}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32, rotateX: 12 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformPerspective: 1200 }}
        >
          <Terminal />
        </motion.div>
      </div>

      <div aria-hidden="true" className="marquee-wrap relative mt-20 overflow-hidden border-y border-line py-5 [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
        <div className="marquee flex w-max gap-10">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={index} className="flex items-center gap-10 font-mono text-sm text-subtle transition-colors hover:text-fg">
              {item}
              <span className="text-accent/50">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
