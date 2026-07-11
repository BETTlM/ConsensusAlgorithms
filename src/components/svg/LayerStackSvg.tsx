"use client";

import { ScrollAnimate } from "./ScrollAnimate";

const INK = "#1a1a1a";
const MUTED = "#5e5e5e";
const LINE = "#d9d0c4";
const FILL = "#ede8df";

export function LayerStackSvg() {
  return (
    <ScrollAnimate
      className="mx-auto w-full max-w-lg"
      label="Layer 2 executes transactions and settles batches on Layer 1"
    >
      <svg
        viewBox="0 0 480 300"
        className="w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* L2 layer */}
        <rect
          className="svg-slide-down"
          x="60"
          y="24"
          width="360"
          height="88"
          rx="8"
          stroke={INK}
          strokeWidth="2"
          fill={FILL}
          fillOpacity="0.5"
        />
        <text x="80" y="52" fill={INK} fontSize="13" fontWeight="700" fontFamily="system-ui, sans-serif">
          Layer 2
        </text>
        <text x="80" y="72" fill={MUTED} fontSize="11" fontFamily="system-ui, sans-serif">
          Fast execution · many transactions
        </text>

        {/* Transaction pills on L2 */}
        {[100, 180, 260, 340].map((x, i) => (
          <g key={x} className={`svg-fade-up svg-delay-${i + 1}`}>
            <rect x={x} y="86" width="56" height="18" rx="4" fill={INK} fillOpacity="0.12" stroke={INK} strokeWidth="1" />
            <text x={x + 28} y="99" textAnchor="middle" fill={INK} fontSize="9" fontFamily="system-ui, sans-serif">
              tx
            </text>
          </g>
        ))}

        {/* Settlement arrows */}
        <path
          className="svg-draw svg-delay-2"
          d="M240 112 L240 148"
          stroke={INK}
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />
        <path
          className="svg-draw svg-delay-3"
          d="M200 130 C200 155, 180 155, 180 168"
          stroke={MUTED}
          strokeWidth="1.5"
          strokeDasharray="5 4"
        />
        <path
          className="svg-draw svg-delay-4"
          d="M280 130 C280 155, 300 155, 300 168"
          stroke={MUTED}
          strokeWidth="1.5"
          strokeDasharray="5 4"
        />

        {/* Batch packet */}
        <g className="svg-fade-up svg-delay-3">
          <rect x="210" y="148" width="60" height="28" rx="6" stroke={INK} strokeWidth="2" fill={INK} fillOpacity="0.06" />
          <text x="240" y="166" textAnchor="middle" fill={INK} fontSize="10" fontWeight="600" fontFamily="system-ui, sans-serif">
            batch
          </text>
        </g>

        <path
          className="svg-draw svg-delay-4"
          d="M240 176 L240 200"
          stroke={INK}
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />

        {/* L1 layer */}
        <rect
          className="svg-slide-up"
          x="40"
          y="200"
          width="400"
          height="72"
          rx="8"
          stroke={INK}
          strokeWidth="2.5"
          fill={FILL}
          fillOpacity="0.7"
        />
        <text x="60" y="228" fill={INK} fontSize="13" fontWeight="700" fontFamily="system-ui, sans-serif">
          Layer 1
        </text>
        <text x="60" y="248" fill={MUTED} fontSize="11" fontFamily="system-ui, sans-serif">
          Consensus · final settlement · security anchor
        </text>

        {/* Block on L1 */}
        <g className="svg-pop svg-delay-5">
          <rect x="330" y="214" width="90" height="44" rx="6" stroke={INK} strokeWidth="2" fill={INK} fillOpacity="0.1" />
          <text x="375" y="232" textAnchor="middle" fill={INK} fontSize="10" fontWeight="600" fontFamily="system-ui, sans-serif">
            Block
          </text>
          <text x="375" y="248" textAnchor="middle" fill={MUTED} fontSize="9" fontFamily="system-ui, sans-serif">
            finalized
          </text>
        </g>

        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={INK} />
          </marker>
        </defs>
      </svg>
    </ScrollAnimate>
  );
}
