import { GitHubIcon, LinkedInIcon } from "./BrandIcons"
import { paletteStore } from "../lib/store"
import { portfolioData } from "../data/portfolio"

export function Footer() {
  const { github, linkedin } = portfolioData.contact
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-subtle md:flex-row md:items-center md:justify-between">
        <p>
          © {currentYear} Gabriel Martorelli · Feito com React 19, Tailwind CSS 4 e Motion.
        </p>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => paletteStore.set(true)}
            className="flex items-center gap-2 transition hover:text-fg"
          >
            Pressione <span className="kbd">Ctrl K</span> para navegar
          </button>
          <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition hover:text-fg">
            <GitHubIcon size={18} />
          </a>
          <a href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition hover:text-fg">
            <LinkedInIcon size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
