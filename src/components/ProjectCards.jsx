import { projects } from "@/data/projects";
import { ArrowRight } from "lucide-react";

const colorMap = {
  blue: {
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    btn: "border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-300 dark:hover:bg-blue-900/30",
    border: "hover:border-blue-300 dark:hover:border-blue-600",
  },
  emerald: {
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    btn: "border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-600 dark:text-emerald-300 dark:hover:bg-emerald-900/30",
    border: "hover:border-emerald-300 dark:hover:border-emerald-600",
  },
  violet: {
    badge: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
    btn: "border-violet-300 text-violet-700 hover:bg-violet-50 dark:border-violet-600 dark:text-violet-300 dark:hover:bg-violet-900/30",
    border: "hover:border-violet-300 dark:hover:border-violet-600",
  },
  amber: {
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    btn: "border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-600 dark:text-amber-300 dark:hover:bg-amber-900/30",
    border: "hover:border-amber-300 dark:hover:border-amber-600",
  },
  slate: {
    badge: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    btn: "border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800",
    border: "hover:border-slate-400 dark:hover:border-slate-500",
  },
};

export default function ProjectCards() {
  return (
    <section className="max-w-5xl mx-auto px-4 mb-20">
      <div className="mb-10">
        <h2 className="text-3xl font-bold">AI Services</h2>
        <p className="mt-3 max-w-3xl text-base text-muted-foreground">
          AI-powered services I built to solve real problems for businesses, churches, job seekers, and individuals.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const c = colorMap[project.color] || colorMap.blue;
          return (
            <article
              key={project.name}
              className={`relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors ${project.comingSoon ? "opacity-70" : c.border}`}
            >
              {project.comingSoon && (
                <span className="absolute top-4 right-4 rounded-full bg-slate-200 dark:bg-slate-700 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:text-slate-300">
                  Coming Soon
                </span>
              )}
              <h3 className="text-lg font-semibold text-card-foreground">{project.name}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {project.description}
              </p>
              {project.comingSoon ? (
                <span className={`mt-5 inline-flex cursor-default items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-medium opacity-50 ${c.btn}`}>
                  Coming Soon
                </span>
              ) : (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-5 inline-flex items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${c.btn}`}
                >
                  {project.cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
