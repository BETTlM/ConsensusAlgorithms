"use client";

import { SECTIONS } from "@/data/types";

export function SectionNav() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Page sections"
      className="sticky top-0 z-30 border-b border-line bg-card/95 shadow-sm backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2.5 md:px-8">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => scrollTo(section.id)}
            className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-body transition-colors hover:bg-accent-soft hover:text-accent-dark"
          >
            <span className="mr-1 text-muted">{section.number}.</span>
            {section.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
