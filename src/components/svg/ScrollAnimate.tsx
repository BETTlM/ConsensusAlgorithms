"use client";

import { type ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

interface ScrollAnimateProps {
  children: ReactNode;
  className?: string;
  label?: string;
}

export function ScrollAnimate({ children, className = "", label }: ScrollAnimateProps) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={`scroll-animate ${inView ? "in-view" : ""} ${className}`.trim()}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      {children}
    </div>
  );
}
