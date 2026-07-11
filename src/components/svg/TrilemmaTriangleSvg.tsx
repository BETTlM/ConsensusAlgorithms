"use client";

import { ScrollAnimate } from "./ScrollAnimate";

interface TrilemmaTriangleSvgProps {
  scalability: number;
  security: number;
  decentralization: number;
}

const INK = "#1a1a1a";
const MUTED = "#5e5e5e";
const LINE = "#d9d0c4";
const FILL = "#ede8df";

export function TrilemmaTriangleSvg({
  scalability,
  security,
  decentralization,
}: TrilemmaTriangleSvgProps) {
  const scores = [
    { label: "Scalability", score: scalability, x: 200, y: 28 },
    { label: "Security", score: security, x: 42, y: 248 },
    { label: "Decentralisation", score: decentralization, x: 358, y: 248 },
  ];

  return (
    <ScrollAnimate
      className="mx-auto w-full max-w-md"
      label="Blockchain trilemma: scalability, security, and decentralisation trade-off"
    >
      <svg
        viewBox="0 0 400 280"
        className="w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          className="svg-draw"
          points="200,40 50,240 350,240"
          stroke={INK}
          strokeWidth="2"
          fill={FILL}
          fillOpacity="0.35"
        />

        <line className="svg-draw svg-delay-1" x1="200" y1="40" x2="50" y2="240" stroke={LINE} strokeWidth="1.5" strokeDasharray="4 4" />
        <line className="svg-draw svg-delay-2" x1="200" y1="40" x2="350" y2="240" stroke={LINE} strokeWidth="1.5" strokeDasharray="4 4" />
        <line className="svg-draw svg-delay-3" x1="50" y1="240" x2="350" y2="240" stroke={LINE} strokeWidth="1.5" strokeDasharray="4 4" />

        <text x="200" y="268" textAnchor="middle" fill={MUTED} fontSize="11" fontFamily="system-ui, sans-serif">
          You can optimise two corners — rarely all three
        </text>

        {scores.map(({ label, score, x, y }, i) => {
          const radius = 10 + score * 1.4;
          return (
            <g key={label} className={`svg-pop svg-delay-${i + 1}`}>
              <circle cx={x} cy={y} r={radius} fill={INK} fillOpacity="0.08" stroke={INK} strokeWidth="2" />
              <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                fill={INK}
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui, sans-serif"
              >
                {score}
              </text>
              <text
                x={x}
                y={y - radius - 8}
                textAnchor="middle"
                fill={MUTED}
                fontSize="11"
                fontWeight="600"
                fontFamily="system-ui, sans-serif"
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </ScrollAnimate>
  );
}
