import { ArrowUpRight, Mail, FolderGit2, BriefcaseBusiness } from "lucide-react"
import { portfolioData } from "../data/portfolio"

export function Footer() {
  const { email, github, linkedin, location } = portfolioData.contact
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">
            Gabriel Martorelli
          </p>

          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Portfólio focado em desenvolvimento full stack, com base sólida em
            .NET, APIs REST, React e construção de projetos modernos para web.
          </p>

          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            {location}
          </p>
        </div>

        <div className="grid gap-3">
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-600 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
          >
            <FolderGit2 size={16} />
            GitHub
            <ArrowUpRight size={14} />
          </a>

          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-600 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
          >
            <BriefcaseBusiness size={16} />
            LinkedIn
            <ArrowUpRight size={14} />
          </a>

          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 text-sm text-slate-600 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
          >
            <Mail size={16} />
            {email}
          </a>
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-sm text-slate-500 dark:text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {currentYear} Gabriel Martorelli. Todos os direitos reservados.
          </p>
          <p>Desenvolvido com React, TypeScript, Tailwind CSS e Motion.</p>
        </div>
      </div>
    </footer>
  )
}
