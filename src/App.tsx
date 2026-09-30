import { MotionConfig } from "motion/react"
import { Background } from "./components/Background"
import { CommandPalette } from "./components/CommandPalette"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { Toast } from "./components/Toast"
import { About } from "./sections/About"
import { Contact } from "./sections/Contact"
import { Hero } from "./sections/Hero"
import { Journey } from "./sections/Journey"
import { Projects } from "./sections/Projects"
import { Skills } from "./sections/Skills"

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen overflow-x-clip text-fg">
        <Background />
        <Header />

        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Journey />
          <Contact />
        </main>

        <Footer />
        <CommandPalette />
        <Toast />
      </div>
    </MotionConfig>
  )
}

export default App
