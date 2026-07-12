import { ScrollProgress } from "./components/ScrollProgress"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { Hero } from "./sections/Hero"
import { About } from "./sections/About"
import { Skills } from "./sections/Skills"
import { Projects } from "./sections/Projects"
import { Experience } from "./sections/Experience"
import { Contact } from "./sections/Contact"

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <ScrollProgress />
      <Header />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
