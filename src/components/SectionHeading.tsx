import type { ReactNode } from "react"

type SectionHeadingProps = {
  index: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
}

export function SectionHeading({ index, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="reveal max-w-2xl">
      <p className="eyebrow flex items-center gap-3">
        <span className="text-subtle">{index}</span>
        <span className="h-px w-8 bg-accent/40" />
        {eyebrow}
      </p>
      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">{title}</h2>
      {description && <p className="mt-5 text-lg leading-8 text-muted">{description}</p>}
    </div>
  )
}
