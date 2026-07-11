"use client";

import { ScrollAnimate } from "./ScrollAnimate";

const INK = "#1a1a1a";
const MUTED = "#5e5e5e";

const STEPS = [
  { label: "Source code", x: 60 },
  { label: "Compile", x: 150 },
  { label: "Deploy", x: 240 },
  { label: "Execute", x: 330 },
];

export function SmartContractPipelineSvg() {
  return (
    <ScrollAnimate
      className="mx-auto w-full max-w-lg"
      label="Smart contract lifecycle from source code to on-chain execution"
    >
      <svg
        viewBox="0 0 390 120"
        className="w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {STEPS.map((step, i) => (
          <g key={step.label}>
            <g className={`svg-pop svg-delay-${i + 1}`}>
              <rect
                x={step.x - 38}
                y="36"
                width="76"
                height="44"
                rx="8"
                stroke={INK}
                strokeWidth="2"
                fill="#ede8df"
                fillOpacity="0.5"
              />
              <text
                x={step.x}
                y="62"
                textAnchor="middle"
                fill={INK}
                fontSize="10"
                fontWeight="600"
                fontFamily="system-ui, sans-serif"
              >
                {step.label}
              </text>
            </g>
            {i < STEPS.length - 1 && (
              <path
                className={`svg-draw svg-delay-${i + 1}`}
                d={`M${step.x + 42} 58 L${STEPS[i + 1].x - 42} 58`}
                stroke={INK}
                strokeWidth="2"
                markerEnd="url(#pipe-arrow)"
              />
            )}
          </g>
        ))}

        <g className="svg-fade-up svg-delay-4">
          <rect x="285" y="88" width="90" height="22" rx="4" stroke={INK} strokeWidth="1" fill={INK} fillOpacity="0.06" />
          <text x="330" y="103" textAnchor="middle" fill={MUTED} fontSize="9" fontFamily="system-ui, sans-serif">
            on-chain state
          </text>
        </g>

        <defs>
          <marker id="pipe-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={INK} />
          </marker>
        </defs>
      </svg>
    </ScrollAnimate>
  );
}
