"use client";

import { ScrollAnimate } from "./ScrollAnimate";

const INK = "#1a1a1a";
const MUTED = "#5e5e5e";
const LINE = "#d9d0c4";

const CLUSTERS = [
  { cx: 100, cy: 80, label: "PoW" },
  { cx: 200, cy: 60, label: "PoS" },
  { cx: 300, cy: 80, label: "BFT" },
  { cx: 150, cy: 160, label: "DPoS" },
  { cx: 250, cy: 160, label: "Other" },
];

const INTERNAL = [
  [0, 0], [0, 1], [1, 1],
  [1, 0], [1, 1],
  [2, 0], [2, 1], [2, 2],
  [3, 0], [3, 1],
  [4, 0],
];

export function CompatibilityClusterSvg() {
  return (
    <ScrollAnimate
      className="mx-auto w-full max-w-md"
      label="Blockchains cluster by shared consensus families; cross-family compatibility is limited"
    >
      <svg
        viewBox="0 0 400 220"
        className="w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {CLUSTERS.map((a, i) =>
          CLUSTERS.map((b, j) => {
            if (j <= i) return null;
            const sameFamily = i === j;
            if (!sameFamily && (i !== 1 || j !== 2)) return null;
            return (
              <line
                key={`${i}-${j}`}
                className="svg-draw svg-delay-3"
                x1={a.cx}
                y1={a.cy}
                x2={b.cx}
                y2={b.cy}
                stroke={LINE}
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            );
          })
        )}

        {CLUSTERS.map((cluster, ci) => (
          <g key={cluster.label}>
            <g className={`svg-pop svg-delay-${ci + 1}`}>
              <circle cx={cluster.cx} cy={cluster.cy} r="32" stroke={INK} strokeWidth="2" fill="#ede8df" fillOpacity="0.4" />
              <text
                x={cluster.cx}
                y={cluster.cy + 4}
                textAnchor="middle"
                fill={INK}
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui, sans-serif"
              >
                {cluster.label}
              </text>
            </g>
            {INTERNAL[ci].map((_, ni) => {
              const angle = (ni / 3) * Math.PI * 2 - Math.PI / 2;
              const nx = cluster.cx + Math.cos(angle) * 18;
              const ny = cluster.cy + Math.sin(angle) * 18;
              return (
                <circle
                  key={ni}
                  className={`svg-fade-up svg-delay-${ni + 2}`}
                  cx={nx}
                  cy={ny}
                  r="5"
                  fill={INK}
                  fillOpacity="0.2"
                  stroke={INK}
                  strokeWidth="1"
                />
              );
            })}
          </g>
        ))}

        <text x="200" y="205" textAnchor="middle" fill={MUTED} fontSize="10" fontFamily="system-ui, sans-serif">
          same consensus → compatible ecosystem
        </text>
      </svg>
    </ScrollAnimate>
  );
}
