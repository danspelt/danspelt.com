import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";

const accentMap = {
  blue: "text-sky-700 dark:text-sky-300",
  emerald: "text-emerald-700 dark:text-emerald-300",
  violet: "text-teal-700 dark:text-teal-300",
  amber: "text-amber-700 dark:text-amber-300",
  slate: "text-slate-700 dark:text-slate-300",
};

function ProjectLink({ project, children, className }) {
  const isExternal = project.url?.startsWith("http");
  if (isExternal) {
    return (
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={project.url || "#"} className={className}>
      {children}
    </Link>
  );
}

export default function ProjectCards() {
  const liveProjects = projects.filter((project) => !project.comingSoon);
  const flagship = liveProjects.find((p) => p.flagship);
  const others = liveProjects.filter((p) => !p.flagship);

  return (
    <section className="container mx-auto max-w-5xl px-4 py-20 border-t border-border/60">
      <div className="mb-10 max-w-2xl">
        <h2 className="text-3xl sm:text-4xl font-semibold">Selected Projects</h2>
        <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
          Live tools and platforms I have built or shipped.
        </p>
      </div>

      {flagship && (
        <article className="group mb-10 overflow-hidden rounded-2xl border border-border/80 bg-card/60 p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs font-semibold tracking-wide uppercase mb-2 text-emerald-700 dark:text-emerald-300">
                {flagship.status} · {flagship.label}
              </p>
              <h3 className="text-2xl sm:text-3xl font-semibold text-foreground mb-3">
                {flagship.name}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                {flagship.description}
              </p>
              {flagship.benefits && (
                <ul className="flex flex-wrap gap-2 mb-6">
                  {flagship.benefits.map((b) => (
                    <li key={b} className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              <ProjectLink
                project={flagship}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4"
              >
                {flagship.cta}
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </ProjectLink>
            </div>
            {flagship.image && (
              <ProjectLink project={flagship} className="block overflow-hidden rounded-xl ring-1 ring-border/60">
                <Image
                    src={flagship.image}
                    alt={`${flagship.name} preview`}
                    width={600}
                    height={340}
                    className="object-cover w-full h-auto transition-transform group-hover:scale-[1.02]"
                    priority
                  />
              </ProjectLink>
            )}
          </div>
        </article>
      )}

      <div className="grid gap-8 md:grid-cols-3">
        {others.map((project) => {
          const accent = accentMap[project.color] || accentMap.blue;
          const isExternal = project.url?.startsWith("http");
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
              <ProjectLink
                project={project}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4"
              >
                {project.cta}
                {isExternal ? (
                  <ExternalLink className="w-3.5 h-3.5" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                )}
              </ProjectLink>
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
