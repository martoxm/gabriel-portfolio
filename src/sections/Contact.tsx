import { ArrowUpRight, Copy, Mail, MapPin, Phone } from "lucide-react"
import type { ReactNode } from "react"
import { MagneticButton } from "../components/MagneticButton"
import { SpotlightCard } from "../components/SpotlightCard"
import { GitHubIcon, LinkedInIcon } from "../components/BrandIcons"
import { copyToClipboard } from "../lib/store"
import { portfolioData } from "../data/portfolio"

function ContactLink({ href, icon, label, value }: { href: string; icon: ReactNode; label: string; value: string }) {
  const external = href.startsWith("http")

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex items-center gap-4 rounded-2xl border border-line bg-surface-2/50 p-4 transition hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface-2"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[11px] uppercase tracking-widest text-subtle">{label}</span>
        <span className="mt-0.5 block truncate text-sm font-medium text-fg">{value}</span>
      </span>
      <ArrowUpRight size={16} className="text-subtle transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
    </a>
  )
}

export function Contact() {
  const { email, phone, phoneLabel, github, linkedin, location } = portfolioData.contact

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-28">
      <SpotlightCard className="reveal overflow-hidden rounded-[2rem]! p-8 md:p-14">
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-accent/20 blur-[100px]" />

        <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow flex items-center gap-3">
              <span className="text-subtle">05</span>
              <span className="h-px w-8 bg-accent/40" />
              Contato
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tighter text-fg md:text-6xl">
              Bora construir <span className="text-gradient">algo juntos?</span>
            </h2>

            <p className="mt-6 max-w-lg text-lg leading-8 text-muted">
              Aberto a trocar ideia sobre .NET, React, IA aplicada, projetos e networking. Respondo rapidinho.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <MagneticButton
                href={`mailto:${email}?subject=Contato%20pelo%20portf%C3%B3lio`}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-fg px-7 text-sm font-medium text-bg shadow-lg shadow-accent/20 transition hover:opacity-90"
              >
                <Mail size={16} /> Enviar e-mail
              </MagneticButton>

              <button
                type="button"
                onClick={() => copyToClipboard(email, "E-mail copiado!")}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong px-5 text-sm text-muted transition hover:bg-surface-2 hover:text-fg"
              >
                <Copy size={15} /> Copiar e-mail
              </button>
            </div>

            <p className="mt-8 flex items-center gap-2 text-sm text-subtle">
              <MapPin size={15} /> {location}
            </p>
          </div>

          <div className="grid content-start gap-3">
            <ContactLink href={`mailto:${email}`} icon={<Mail size={18} />} label="E-mail" value={email} />
            <ContactLink href={linkedin} icon={<LinkedInIcon size={18} />} label="LinkedIn" value="in/gabrielmartorelli" />
            <ContactLink href={github} icon={<GitHubIcon size={18} />} label="GitHub" value="@martoxm" />
            <ContactLink href={`tel:${phone}`} icon={<Phone size={18} />} label="Telefone" value={phoneLabel} />
          </div>
        </div>
      </SpotlightCard>
    </section>
  )
}
