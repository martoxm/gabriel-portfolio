import {
  Mail,
  Phone,
  MapPin,
  FolderGit2,
  BriefcaseBusiness,
} from "lucide-react"
import { SectionReveal } from "../components/SectionReveal"
import { MagneticButton } from "../components/MagneticButton"
import { portfolioData } from "../data/portfolio"

export function Contact() {
  const { email, phone, phoneLabel, github, linkedin, location } =
    portfolioData.contact

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20">
      <SectionReveal>
        <div className="rounded-4xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            Contato
          </p>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="text-3xl font-bold leading-tight text-slate-900 dark:text-white md:text-4xl">
                Vamos conversar sobre estágio, projetos e oportunidades
              </h2>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                Estou em transição para oportunidades de estágio ou nível júnior
                em desenvolvimento full stack, com foco em back-end .NET,
                front-end com React e projetos modernos para web.
              </p>

              <div className="mt-8">
                <MagneticButton
                  href={`mailto:${email}?subject=Contato%20pelo%20portfólio`}
                  className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  Enviar e-mail
                </MagneticButton>
              </div>
            </div>

            <div className="grid gap-4">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900"
              >
                <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
                  <Mail size={20} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                    E-mail
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white">
                    {email}
                  </p>
                </div>
              </a>

              <a
                href={`tel:${phone}`}
                className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900"
              >
                <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
                  <Phone size={20} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                    Telefone
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white">
                    {phoneLabel}
                  </p>
                </div>
              </a>

              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900"
              >
                <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
                  <FolderGit2 size={20} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                    GitHub
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white">
                    martoxm
                  </p>
                </div>
              </a>

              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900"
              >
                <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
                  <BriefcaseBusiness size={20} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                    LinkedIn
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white">
                    Perfil profissional
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
                  <MapPin size={20} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                    Localização
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white">
                    {location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
