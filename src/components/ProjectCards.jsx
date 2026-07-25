import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

const accentMap = {
  blue: "text-sky-700 dark:text-sky-300",
  emerald: "text-emerald-700 dark:text-emerald-300",
  violet: "text-teal-700 dark:text-teal-300",
  amber: "text-amber-700 dark:text-amber-300",
  slate: "text-slate-700 dark:text-slate-300",
};

export default function ProjectCards() {
  const liveProjects = projects.filter((project) => !project.comingSoon);

  return (
    <section className="container mx-auto max-w-5xl px-4 py-20 border-t border-border/60">
      <div className="mb-10 max-w-2xl">
        <h2 className="text-3xl sm:text-4xl font-semibold">AI Services</h2>
        <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
          Tools I built for real problems — audits, resumes, and faith-based web help.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {liveProjects.map((project) => {
          const accent = accentMap[project.color] || accentMap.blue;
          return (
            <article key={project.name} className="group">
              <p className={`text-xs font-semibold tracking-wide uppercase mb-2 ${accent}`}>
                {project.status}
              </p>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {project.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {project.description}
              </p>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4"
              >
                {project.cta}
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </article>
          );
        })}
      </div>
      <p className="mt-10 text-sm text-muted-foreground">
        Need something built around your workflow?{" "}
        <Link href="/custom-software" className="text-primary font-medium hover:underline underline-offset-4">
          Explore custom software
        </Link>
      </p>
    </section>
  );
}
