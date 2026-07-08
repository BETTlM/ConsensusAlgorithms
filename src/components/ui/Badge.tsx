type BadgeVariant = "default" | "l1" | "l2" | "accent" | "neutral";

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-card-muted text-body border border-line",
  l1: "bg-l1-bg text-l1-ink border border-blue-200",
  l2: "bg-l2-bg text-l2-ink border border-purple-200",
  accent: "bg-accent text-white border border-accent-dark",
  neutral: "bg-card-muted text-body border border-line",
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
