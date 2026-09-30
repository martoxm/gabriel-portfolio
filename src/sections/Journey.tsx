import { useRef } from "react"
import { motion, useScroll, useSpring } from "motion/react"
import { Award, BriefcaseBusiness, GraduationCap } from "lucide-react"
import { SectionHeading } from "../components/SectionHeading"
import { SpotlightCard } from "../components/SpotlightCard"
import { portfolioData } from "../data/portfolio"

export function Journey() {
  const { timeline, certifications } = portfolioData
  const listRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 })

  return (
    <section id="journey" className="mx-auto max-w-6xl px-4 py-28">
      <SectionHeading
        index="04"
        eyebrow="Trajetória"
        title="De liderar equipes a construir software"
        description="Minha experiência com gestão e operação virou visão de negócio — hoje aplicada no desenvolvimento de um ERP."
      />

      <div ref={listRef} className="relative mt-16 ml-3 md:ml-[calc(180px+1.5rem)]">
        <div aria-hidden="true" className="absolute top-2 bottom-2 left-0 w-px bg-line" />
        <motion.div
          aria-hidden="true"
          style={{ scaleY }}
          className="absolute top-2 bottom-2 left-0 w-px origin-top bg-linear-to-b from-accent via-accent-2 to-accent"
        />

        <ol>

        {timeline.map((item) => (
          <li key={item.title} className="relative pb-12 pl-10 last:pb-0 md:pl-12">
            <motion.span
              aria-hidden="true"
              initial={{ scale: 0.4, opacity: 0.4 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ margin: "0px 0px -40% 0px" }}
              transition={{ type: "spring", bounce: 0.5 }}
              className={`absolute top-1 -left-[15px] grid size-[30px] place-items-center rounded-full border bg-bg ${
                item.current ? "border-accent text-accent shadow-[0_0_24px_var(--accent)]" : "border-line-strong text-muted"
              }`}
            >
              {item.kind === "work" ? <BriefcaseBusiness size={13} /> : <GraduationCap size={14} />}
            </motion.span>

            <p className="font-mono text-xs text-subtle md:absolute md:top-2 md:-left-[calc(180px+1.5rem)] md:w-[180px] md:text-right">
              {item.period}
            </p>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <SpotlightCard className="mt-2 p-6 md:mt-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-semibold text-fg">{item.title}</h3>
                  {item.current && (
                    <span className="chip border-ok/30! bg-ok/10! text-ok!">
                      <span className="size-1.5 animate-pulse rounded-full bg-ok" /> atual
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-accent">{item.org}</p>
                <p className="mt-4 leading-7 text-muted">{item.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          </li>
        ))}
        </ol>
      </div>

      <div className="mt-24">
        <p className="reveal eyebrow flex items-center gap-3">
          <Award size={14} /> Licenças e certificados
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
            >
              <SpotlightCard className="flex h-full flex-col p-6">
                <span className="grid size-10 place-items-center rounded-xl bg-accent/10 text-accent">
                  <Award size={18} />
                </span>
                <p className="mt-5 font-medium leading-6 text-fg">{cert.title}</p>
                <p className="mt-auto pt-4 text-sm text-muted">
                  {cert.issuer} <span className="text-subtle">· {cert.date}</span>
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
