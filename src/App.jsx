import Background from './components/effects/Background'
import Navbar from './components/layout/Navbar'
import ScrollArrows from './components/layout/ScrollArrows'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import About from './components/sections/About'
import Journey from './components/sections/Journey'
import Content from './components/sections/Content'
import Contact from './components/sections/Contact'

export default function App() {
  return (
    <>
      <Background />
      <Navbar />
      <ScrollArrows />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Journey />
        <Content />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
