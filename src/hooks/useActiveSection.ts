import { useEffect, useState } from "react"

export const sectionIds = ["home", "about", "skills", "projects", "journey", "contact"]

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting)

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id)
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return activeSection
}
