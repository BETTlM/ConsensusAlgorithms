"use client";

import { type ReactNode } from "react";
import { ScrollAnimate } from "./ScrollAnimate";

const INK = "#1a1a1a";
const MUTED = "#5e5e5e";
const LINE = "#d9d0c4";

type FlowKind =
  | "pow"
  | "stake"
  | "delegate"
  | "authority"
  | "bft"
  | "timeline"
  | "avalanche";

function getFlowKind(algorithmId: string): FlowKind {
  switch (algorithmId) {
    case "pow":
      return "pow";
    case "pos":
    case "npos":
    case "lpos":
      return "stake";
    case "dpos":
      return "delegate";
    case "poa":
      return "authority";
    case "pbft":
    case "tendermint":
      return "bft";
    case "poh":
      return "timeline";
    case "avalanche":
      return "avalanche";
    default:
      return "stake";
  }
}

interface ConsensusFlowSvgProps {
  algorithmId: string;
  shortName: string;
}

function FlowNode({
  x,
  y,
  label,
  sublabel,
  delay,
  wide = false,
}: {
  x: number;
  y: number;
  label: string;
  sublabel?: string;
  delay: number;
  wide?: boolean;
}) {
  const w = wide ? 110 : 88;
  const h = sublabel ? 52 : 40;
  return (
    <g className={`svg-pop svg-delay-${delay}`}>
      <rect
        x={x - w / 2}
        y={y - h / 2}
        width={w}
        height={h}
        rx="8"
        stroke={INK}
        strokeWidth="2"
        fill="#ede8df"
        fillOpacity="0.6"
      />
      <text
        x={x}
        y={sublabel ? y - 4 : y + 4}
        textAnchor="middle"
        fill={INK}
        fontSize="11"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
      >
        {label}
      </text>
      {sublabel && (
        <text
          x={x}
          y={y + 14}
          textAnchor="middle"
          fill={MUTED}
          fontSize="9"
          fontFamily="system-ui, sans-serif"
        >
          {sublabel}
        </text>
      )}
    </g>
  );
}

function FlowArrow({ d, delay }: { d: string; delay: number }) {
  return (
    <path
      className={`svg-draw svg-delay-${delay}`}
      d={d}
      stroke={INK}
      strokeWidth="2"
      markerEnd="url(#flow-arrow)"
    />
  );
}

function PowFlow() {
  return (
    <>
      <FlowNode x={70} y={80} label="Transactions" sublabel="broadcast" delay={1} />
      <FlowArrow d="M124 80 L156 80" delay={1} />
      <FlowNode x={200} y={80} label="Miners hash" sublabel="find nonce" delay={2} />
      <FlowArrow d="M254 80 L286 80" delay={2} />
      <FlowNode x={330} y={80} label="Valid block" sublabel="added to chain" delay={3} />

      <g className="svg-fade-up svg-delay-4">
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={300 + i * 22}
            y={140}
            width="18"
            height="18"
            rx="3"
            stroke={INK}
            strokeWidth="1.5"
            fill={INK}
            fillOpacity={0.08 + i * 0.06}
          />
        ))}
        <text x="340" y="178" textAnchor="middle" fill={MUTED} fontSize="10" fontFamily="system-ui, sans-serif">
          longest chain wins
        </text>
      </g>
    </>
  );
}

function StakeFlow() {
  return (
    <>
      <FlowNode x={70} y={80} label="Stake deposit" delay={1} />
      <FlowArrow d="M118 80 L152 80" delay={1} />
      <FlowNode x={200} y={80} label="Validator" sublabel="selected" delay={2} />
      <FlowArrow d="M254 80 L288 80" delay={2} />
      <FlowNode x={340} y={80} label="Attest &" sublabel="finalize" delay={3} />

      <g className="svg-fade-up svg-delay-4">
        <circle cx="200" cy="150" r="28" stroke={LINE} strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
        <text x="200" y="154" textAnchor="middle" fill={MUTED} fontSize="9" fontFamily="system-ui, sans-serif">
          slash if
        </text>
        <text x="200" y="166" textAnchor="middle" fill={MUTED} fontSize="9" fontFamily="system-ui, sans-serif">
          dishonest
        </text>
      </g>
    </>
  );
}

function DelegateFlow() {
  return (
    <>
      <FlowNode x={70} y={70} label="Token vote" delay={1} />
      <FlowArrow d="M118 70 L152 70" delay={1} />
      <FlowNode x={200} y={70} label="Delegates" sublabel="elected" delay={2} />
      <FlowArrow d="M254 70 L288 70" delay={2} />
      <FlowNode x={340} y={70} label="Block" sublabel="production" delay={3} />

      {[0, 1, 2, 3].map((i) => (
        <g key={i} className={`svg-fade-up svg-delay-${i + 2}`}>
          <circle cx={120 + i * 50} cy={145} r="6" fill={INK} fillOpacity="0.2" stroke={INK} strokeWidth="1" />
        </g>
      ))}
      <text x="200" y="175" textAnchor="middle" fill={MUTED} fontSize="10" fontFamily="system-ui, sans-serif">
        limited validator set
      </text>
    </>
  );
}

function AuthorityFlow() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <g key={i} className={`svg-pop svg-delay-${i + 1}`}>
          <rect
            x={80 + i * 110}
            y={60}
            width="70"
            height="50"
            rx="8"
            stroke={INK}
            strokeWidth="2"
            fill="#ede8df"
            fillOpacity="0.5"
          />
          <text x={115 + i * 110} y="82" textAnchor="middle" fill={INK} fontSize="10" fontWeight="600" fontFamily="system-ui, sans-serif">
            Validator
          </text>
          <text x={115 + i * 110} y="98" textAnchor="middle" fill={MUTED} fontSize="9" fontFamily="system-ui, sans-serif">
            {i + 1}
          </text>
        </g>
      ))}

      <path className="svg-draw svg-delay-4" d="M150 110 C200 140, 260 140, 310 110" stroke={INK} strokeWidth="2" fill="none" markerEnd="url(#flow-arrow)" />
      <FlowNode x={200} y={165} label="Signed block" wide delay={4} />
    </>
  );
}

function BftFlow() {
  const rounds = ["Pre-prepare", "Prepare", "Commit"];
  return (
    <>
      {rounds.map((round, i) => (
        <g key={round} className={`svg-slide-down svg-delay-${i + 1}`}>
          <rect x="60" y={40 + i * 55} width="280" height="42" rx="6" stroke={INK} strokeWidth="1.5" fill="#ede8df" fillOpacity="0.4" />
          <text x="80" y={66 + i * 55} fill={INK} fontSize="11" fontWeight="600" fontFamily="system-ui, sans-serif">
            Round {i + 1}: {round}
          </text>
          {[0, 1, 2, 3].map((n) => (
            <circle key={n} cx={220 + n * 28} cy={61 + i * 55} r="7" fill={INK} fillOpacity={0.1 + n * 0.05} stroke={INK} strokeWidth="1" />
          ))}
        </g>
      ))}
      <g className="svg-pop svg-delay-4">
        <rect x="130" y="210" width="140" height="36" rx="8" stroke={INK} strokeWidth="2" fill={INK} fillOpacity="0.08" />
        <text x="200" y="232" textAnchor="middle" fill={INK} fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif">
          2/3 agree → final
        </text>
      </g>
    </>
  );
}

function TimelineFlow() {
  return (
    <>
      <line className="svg-draw" x1="50" y1="100" x2="350" y2="100" stroke={INK} strokeWidth="2" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i} className={`svg-fade-up svg-delay-${Math.min(i + 1, 5)}`}>
          <line x1={80 + i * 50} y1="92" x2={80 + i * 50} y2="108" stroke={INK} strokeWidth="2" />
          <text x={80 + i * 50} y="125" textAnchor="middle" fill={MUTED} fontSize="8" fontFamily="system-ui, sans-serif">
            tick
          </text>
        </g>
      ))}
      <text x="200" y="75" textAnchor="middle" fill={INK} fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif">
        Verifiable delay sequence
      </text>
      <FlowArrow d="M200 135 L200 165" delay={3} />
      <FlowNode x={200} y={195} label="PoS validators" sublabel="confirm order" delay={4} wide />
    </>
  );
}

function AvalancheFlow() {
  const nodes = [
    { cx: 200, cy: 60 },
    { cx: 120, cy: 100 },
    { cx: 280, cy: 100 },
    { cx: 90, cy: 160 },
    { cx: 200, cy: 160 },
    { cx: 310, cy: 160 },
    { cx: 150, cy: 210 },
    { cx: 250, cy: 210 },
  ];

  return (
    <>
      {nodes.map(({ cx, cy }, i) => (
        <g key={i} className={`svg-pop svg-delay-${(i % 5) + 1}`}>
          <circle cx={cx} cy={cy} r="14" stroke={INK} strokeWidth="2" fill={INK} fillOpacity={i < 3 ? 0.25 : 0.08} />
        </g>
      ))}
      <path className="svg-draw svg-delay-2" d="M200 74 L130 92" stroke={LINE} strokeWidth="1" />
      <path className="svg-draw svg-delay-2" d="M200 74 L270 92" stroke={LINE} strokeWidth="1" />
      <path className="svg-draw svg-delay-3" d="M120 114 L100 148" stroke={LINE} strokeWidth="1" />
      <path className="svg-draw svg-delay-3" d="M280 114 L300 148" stroke={LINE} strokeWidth="1" />
      <text x="200" y="248" textAnchor="middle" fill={MUTED} fontSize="10" fontFamily="system-ui, sans-serif">
        repeated subsampling → consensus
      </text>
    </>
  );
}

const FLOW_RENDERERS: Record<FlowKind, () => ReactNode> = {
  pow: PowFlow,
  stake: StakeFlow,
  delegate: DelegateFlow,
  authority: AuthorityFlow,
  bft: BftFlow,
  timeline: TimelineFlow,
  avalanche: AvalancheFlow,
};

export function ConsensusFlowSvg({ algorithmId, shortName }: ConsensusFlowSvgProps) {
  const kind = getFlowKind(algorithmId);
  const Flow = FLOW_RENDERERS[kind];

  return (
    <ScrollAnimate
      className="w-full"
      label={`${shortName} consensus flow diagram`}
    >
      <svg
        viewBox="0 0 400 260"
        className="w-full rounded-lg border border-line bg-card-muted/30 p-2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker id="flow-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={INK} />
          </marker>
        </defs>
        <Flow />
      </svg>
    </ScrollAnimate>
  );
}
