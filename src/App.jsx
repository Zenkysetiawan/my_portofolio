import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Journey from "./components/sections/Journey";
import Content from "./components/sections/Content";
import Cv from "./components/sections/Cv";
import Contact from "./components/sections/Contact";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Journey />
        <Content />
        <Cv />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
