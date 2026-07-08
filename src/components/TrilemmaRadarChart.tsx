"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { consensusAlgorithms } from "@/data/consensus";
import { useSelection } from "@/context/SelectionContext";
import { Panel } from "@/components/ui/Panel";

const COMPARE_COLORS = ["#2a9d8f", "#e07a5f", "#3d405b"];

function buildRadarData(
  algorithmIds: string[]
): Record<string, string | number>[] {
  const axes = [
    { key: "scalability", label: "Scalability" },
    { key: "security", label: "Security" },
    { key: "decentralization", label: "Decentralisation" },
  ] as const;

  return axes.map(({ key, label }) => {
    const row: Record<string, string | number> = { axis: label };
    algorithmIds.forEach((id) => {
      const algo = consensusAlgorithms.find((a) => a.id === id);
      if (algo) row[id] = algo.trilemma[key];
    });
    return row;
  });
}

export function TrilemmaRadarChart() {
  const {
    selectedAlgorithm,
    compareMode,
    setCompareMode,
    compareIds,
    toggleCompareId,
    selectedAlgorithmId,
  } = useSelection();

  const displayIds = compareMode
    ? compareIds.length > 0
      ? compareIds
      : [selectedAlgorithmId]
    : [selectedAlgorithmId];

  const radarData = buildRadarData(displayIds);

  return (
    <Panel
      id="trilemma"
      sectionNumber={2}
      title="Blockchain Trilemma Analysis"
      subtitle="Scalability, security, and decentralisation rated 1–10"
      action={
        <label className="flex cursor-pointer items-center gap-2 text-sm text-body">
          <input
            type="checkbox"
            checked={compareMode}
            onChange={(e) => setCompareMode(e.target.checked)}
            className="h-4 w-4 rounded border-line-strong accent-accent"
          />
          Compare up to 3
        </label>
      }
    >
      <div key={selectedAlgorithm.id} className="animate-fade-in space-y-6">
        <div className="rounded-lg border border-line bg-card-muted p-5 text-sm leading-relaxed text-body">
          <p>
            The <strong className="font-semibold text-ink">blockchain trilemma</strong>{" "}
            says you cannot maximise all three at once:{" "}
            <strong className="font-semibold text-ink">scalability</strong> (TPS and block
            speed), <strong className="font-semibold text-ink">security</strong> (51% and
            Sybil resistance), and{" "}
            <strong className="font-semibold text-ink">decentralisation</strong> (open node
            participation). Scores here are comparative estimates, not live benchmarks.
          </p>
        </div>

        {compareMode && (
          <div className="flex flex-wrap items-center gap-2">
            {consensusAlgorithms.map((algo) => {
              const active = compareIds.includes(algo.id);
              const disabled = !active && compareIds.length >= 3;
              return (
                <button
                  key={algo.id}
                  type="button"
                  disabled={disabled}
                  aria-pressed={active}
                  onClick={() => toggleCompareId(algo.id)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-accent text-white"
                      : disabled
                        ? "cursor-not-allowed bg-card-muted text-muted"
                        : "border border-line bg-card text-body hover:border-accent"
                  }`}
                >
                  {algo.shortName}
                </button>
              );
            })}
          </div>
        )}

        <div className="h-80 w-full rounded-lg border border-line bg-card p-2" role="img" aria-label="Trilemma radar chart">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="72%">
              <PolarGrid stroke="#d9d0c4" />
              <PolarAngleAxis
                dataKey="axis"
                tick={{ fill: "#3a3a3a", fontSize: 13, fontWeight: 500 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 10]}
                tick={{ fill: "#5e5e5e", fontSize: 11 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fffcf7",
                  border: "1px solid #d9d0c4",
                  borderRadius: "8px",
                  fontSize: "14px",
                  color: "#1a1a1a",
                }}
              />
              {displayIds.map((id, i) => {
                const algo = consensusAlgorithms.find((a) => a.id === id);
                return (
                  <Radar
                    key={id}
                    name={algo?.shortName ?? id}
                    dataKey={id}
                    stroke={COMPARE_COLORS[i % COMPARE_COLORS.length]}
                    fill={COMPARE_COLORS[i % COMPARE_COLORS.length]}
                    fillOpacity={compareMode ? 0.15 : 0.25}
                    strokeWidth={2}
                  />
                );
              })}
              {compareMode && displayIds.length > 1 && (
                <Legend wrapperStyle={{ fontSize: "13px", color: "#3a3a3a" }} />
              )}
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <ScoreCard
            title="Scalability"
            metric={`Block time: ${selectedAlgorithm.blockTime}`}
            submetric={`Throughput: ${selectedAlgorithm.tps}`}
            score={selectedAlgorithm.trilemma.scalability}
            note={selectedAlgorithm.scalabilityNotes}
          />
          <ScoreCard
            title="Security"
            metric="51% attack resistance"
            submetric="Sybil resistance"
            score={selectedAlgorithm.trilemma.security}
            note={selectedAlgorithm.securityNotes}
          />
          <ScoreCard
            title="Decentralisation"
            metric="Node participation"
            submetric="Permissionless entry"
            score={selectedAlgorithm.trilemma.decentralization}
            note={selectedAlgorithm.decentralizationNotes}
          />
        </div>
      </div>
    </Panel>
  );
}

function ScoreCard({
  title,
  metric,
  submetric,
  score,
  note,
}: {
  title: string;
  metric: string;
  submetric: string;
  score: number;
  note: string;
}) {
  return (
    <div className="rounded-lg border border-line bg-card p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h4 className="text-sm font-semibold text-ink">{title}</h4>
        <span className="text-xl font-bold tabular-nums text-accent-dark">
          {score}/10
        </span>
      </div>
      <p className="text-sm font-medium text-body">{metric}</p>
      <p className="mb-3 text-sm text-muted">{submetric}</p>
      <div className="mb-3 h-2.5 overflow-hidden rounded-full bg-card-muted">
        <div
          className="h-full rounded-full bg-accent"
          style={{ width: `${score * 10}%` }}
          role="progressbar"
          aria-valuenow={score}
          aria-valuemin={0}
          aria-valuemax={10}
          aria-label={`${title} score`}
        />
      </div>
      <p className="text-sm leading-relaxed text-body">{note}</p>
    </div>
  );
}
