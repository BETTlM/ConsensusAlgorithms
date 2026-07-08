import { type ReactNode } from "react";

interface PanelProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  id?: string;
  action?: ReactNode;
  sectionNumber?: number;
}

export function Panel({
  title,
  subtitle,
  children,
  id,
  action,
  sectionNumber,
}: PanelProps) {
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-heading` : undefined}
      className="overflow-hidden rounded-xl border border-line bg-card shadow-sm"
    >
      <div className="border-b border-line bg-card-muted/50 px-5 py-4 md:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            {sectionNumber !== undefined && (
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white"
                aria-hidden="true"
              >
                {sectionNumber}
              </span>
            )}
            <div className="min-w-0">
              <h2
                id={id ? `${id}-heading` : undefined}
                className="text-lg font-semibold leading-snug text-ink md:text-xl"
              >
                {title}
              </h2>
              {subtitle && (
                <p className="mt-1 text-sm leading-relaxed text-body">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      </div>
      <div className="px-5 py-5 md:px-6 md:py-6">{children}</div>
    </section>
  );
}
