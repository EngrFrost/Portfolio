import Link from "next/link";
import RevealText from "@/components/motion/RevealText";
import RevealImage from "@/components/motion/RevealImage";
import AboutImg from "@/public/assets/about.jpg";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-content px-4 py-32 md:px-8">
      <span className="section-number">01 — About</span>
      <div className="mt-8 grid gap-12 md:grid-cols-3">
        <div className="md:col-span-2">
          <RevealText as="h2" className="text-4xl md:text-6xl">
            Who I Am
          </RevealText>
          <RevealText className="mt-8 max-w-2xl text-lg text-text-muted">
            Hello, I&apos;m Ian — a dedicated software developer with three years of
            experience. My journey has been a fusion of innovation and collaboration:
            crafting intuitive interfaces, integrating robust back-end systems, and driving
            impactful projects. I thrive in dynamic teams, embrace constant learning, and
            channel my creativity both in and out of coding. Let&apos;s connect and create
            exceptional software solutions together.
          </RevealText>
          <Link
            href="/#projects"
            className="mt-8 inline-block text-accent underline underline-offset-4"
            data-cursor="interactive"
          >
            Check out some of my latest projects.
          </Link>
        </div>
        <RevealImage src={AboutImg} alt="Ian John Samson" className="aspect-[3/4]" />
      </div>
    </section>
  );
}
