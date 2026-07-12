import { motion } from "motion/react"
import { portfolioData } from "../data/portfolio"
import { MagneticButton } from "../components/MagneticButton"

export function Hero() {
  const { name, title, subtitle } = portfolioData.hero

  return (
    <section
      id="home"
      className="mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl items-center px-4 py-16"
    >
      <div className="max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400"
        >
          Portfólio 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl font-bold tracking-tight text-slate-900 md:text-6xl dark:text-white"
        >
          {name}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 text-xl font-semibold text-slate-700 md:text-2xl dark:text-slate-200"
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-lg dark:text-slate-300"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <MagneticButton
            href="#projects"
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            Ver projetos
          </MagneticButton>

          <MagneticButton
            href="#contact"
            className="rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-900 transition hover:border-slate-400 hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
          >
            Entrar em contato
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}
