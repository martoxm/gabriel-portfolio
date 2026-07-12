import { Header } from "./components/Header"
import { Hero } from "./sections/Hero"
import { About } from "./sections/About"
import { Skills } from "./sections/Skills"
import { Projects } from "./sections/Projects"
import { Experience } from "./sections/Experience"
import { Contact } from "./sections/Contact"

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <Header />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </div>
  )
}

export default App
