"use client";

import { ScrollAnimate } from "./ScrollAnimate";

const INK = "#1a1a1a";
const MUTED = "#5e5e5e";
const LINE = "#d9d0c4";

const NODES = [
  { cx: 200, cy: 120, r: 18, primary: true },
  { cx: 100, cy: 70, r: 12 },
  { cx: 300, cy: 70, r: 12 },
  { cx: 60, cy: 150, r: 12 },
  { cx: 340, cy: 150, r: 12 },
  { cx: 120, cy: 210, r: 12 },
  { cx: 280, cy: 210, r: 12 },
];

const EDGES = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
  [1, 3], [2, 4], [5, 3], [6, 4],
];

export function NetworkPropagationSvg() {
  return (
    <ScrollAnimate
      className="mx-auto w-full max-w-sm"
      label="Block propagation across peer nodes in a distributed network"
    >
      <svg
        viewBox="0 0 400 260"
        className="w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {EDGES.map(([a, b], i) => {
          const from = NODES[a];
          const to = NODES[b];
          return (
            <line
              key={`${a}-${b}`}
              className={`svg-draw svg-delay-${(i % 4) + 1}`}
              x1={from.cx}
              y1={from.cy}
              x2={to.cx}
              y2={to.cy}
              stroke={LINE}
              strokeWidth="1.5"
            />
          );
        })}

        {NODES.map(({ cx, cy, r, primary }, i) => (
          <g key={i} className={`svg-pop svg-delay-${(i % 5) + 1}`}>
            {primary && (
              <circle
                className="svg-pulse-ring"
                cx={cx}
                cy={cy}
                r={r + 14}
                stroke={INK}
                strokeWidth="1"
                fill="none"
                opacity="0.4"
              />
            )}
            <circle
              cx={cx}
              cy={cy}
              r={r}
              stroke={INK}
              strokeWidth={primary ? 2.5 : 1.5}
              fill={INK}
              fillOpacity={primary ? 0.15 : 0.06}
            />
            {primary && (
              <text
                x={cx}
                y={cy + 4}
                textAnchor="middle"
                fill={INK}
                fontSize="9"
                fontWeight="700"
                fontFamily="system-ui, sans-serif"
              >
                new
              </text>
            )}
          </g>
        ))}

        <text x="200" y="248" textAnchor="middle" fill={MUTED} fontSize="11" fontFamily="system-ui, sans-serif">
          peers validate and relay the block
        </text>
      </svg>
    </ScrollAnimate>
  );
}
