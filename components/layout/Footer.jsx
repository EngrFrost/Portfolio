import { AiOutlineMail } from "react-icons/ai";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";

const links = [
  { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/in/ian-john-samson-60942a238" },
  { icon: <FaGithub />, href: "https://github.com/EngrFrost" },
  { icon: <AiOutlineMail />, href: "mailto:jsamson257@gmail.com" },
  { icon: <BsFillPersonLinesFill />, href: "/resume.pdf" },
];

export default function Footer() {
  return (
    <footer className="border-t border-surface-2">
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-6 px-4 py-10 md:flex-row md:px-8">
        <p className="font-display text-xl">
          Ian John Samson<span className="text-accent">.</span>
        </p>
        <div className="flex gap-4">
          {links.map((l, i) => (
            <a
              key={i}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="grid h-11 w-11 place-items-center rounded-full border border-surface-2 transition-colors hover:border-accent hover:text-accent"
              data-cursor="interactive"
            >
              {l.icon}
            </a>
          ))}
        </div>
        <p className="text-sm text-text-muted">© 2026 — Built with Next.js</p>
      </div>
    </footer>
  );
}
