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
      <div className="grid w-full items-center gap-12 lg:grid-cols-2">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300"
          >
            Disponível para estágio e oportunidades júnior
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
            className="mt-5 text-xl font-semibold leading-tight text-slate-700 md:text-3xl dark:text-slate-200"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg dark:text-slate-300"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {["C#", ".NET", "React", "TypeScript", "SQL", "Docker"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                >
                  {item}
                </span>
              ),
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-4"
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

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Perfil profissional
                </p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                  Full Stack com base forte em back-end
                </h3>
              </div>

              <div className="h-12 w-12 rounded-2xl bg-indigo-600/10 ring-1 ring-indigo-500/20 dark:bg-indigo-500/10" />
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Stack principal
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
                  .NET + React
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Foco atual
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
                  Back-end e Full Stack
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Deploy e cloud
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
                  Docker + OCI + Nginx
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-4 dark:border-slate-700">
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                Portfólio orientado a projetos reais, consumo de API,
                arquitetura limpa, deploy e evolução contínua para o mercado.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
