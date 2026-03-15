import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";

export default function Home() {
  return (
    <main id="main-content">
      <a href="#about" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Footer />
    </main>
  );
}
