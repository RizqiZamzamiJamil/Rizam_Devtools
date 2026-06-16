"use client";

import { Clock3, Copy, RefreshCcw } from "lucide-react";
import { useMemo } from "react";
import { DetailRow } from "@/components/ui/detail-row";
import { Input } from "@/components/ui/form-fields";
import { Panel } from "@/components/ui/panel";
import { StatusPill } from "@/components/ui/status-pill";
import { ToolButton } from "@/components/ui/tool-button";
import { toDateTimeLocal } from "@/lib/toolbox/time";
import type { ToolProps } from "./tool-props";

export function TimestampTool({
  copyText,
  updateWorkspace,
  workspace,
}: ToolProps) {
  const parsed = useMemo(() => {
    const raw = workspace.timestampInput.trim();
    if (!raw) return { error: "No timestamp", rows: [] };

    const numeric = Number(raw);
    if (!Number.isFinite(numeric)) return { error: "Invalid timestamp", rows: [] };

    const milliseconds =
      Math.abs(numeric) < 1_000_000_000_000 ? numeric * 1000 : numeric;
    const date = new Date(milliseconds);
    if (Number.isNaN(date.getTime())) return { error: "Invalid date", rows: [] };

    return {
      error: "",
      rows: [
        ["Seconds", Math.floor(date.getTime() / 1000)],
        ["Milliseconds", date.getTime()],
        ["Local", date.toLocaleString()],
        ["UTC", date.toUTCString()],
        ["ISO", date.toISOString()],
        ["Date input", toDateTimeLocal(date)],
      ] as [string, string | number][],
    };
  }, [workspace.timestampInput]);

  function useNow() {
    const now = new Date();
    updateWorkspace("timestampInput", String(Math.floor(now.getTime() / 1000)));
    updateWorkspace("dateInput", toDateTimeLocal(now));
  }

  function dateToTimestamp() {
    const date = new Date(workspace.dateInput);
    if (!Number.isNaN(date.getTime())) {
      updateWorkspace("timestampInput", String(Math.floor(date.getTime() / 1000)));
    }
  }

  const exportValue = parsed.rows
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  return (
    <div className="grid items-start gap-4 xl:grid-cols-[24rem_minmax(0,1fr)]">
      <Panel className="p-4">
        <div className="grid gap-3">
          <Input
            label="Unix timestamp"
            onChange={(value) => updateWorkspace("timestampInput", value)}
            value={workspace.timestampInput}
          />
          <Input
            label="Local date"
            onChange={(value) => updateWorkspace("dateInput", value)}
            type="datetime-local"
            value={workspace.dateInput}
          />
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
            <ToolButton icon={Clock3} onClick={useNow} variant="primary">
              Now
            </ToolButton>
            <ToolButton icon={RefreshCcw} onClick={dateToTimestamp}>
              To timestamp
            </ToolButton>
          </div>
        </div>
      </Panel>

      <Panel className="p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <StatusPill tone={parsed.error ? "warn" : "ok"}>
            {parsed.error || "Converted"}
          </StatusPill>
          <ToolButton
            icon={Copy}
            onClick={() => copyText(exportValue, "Timestamp copied")}
          >
            Copy
          </ToolButton>
        </div>
        <dl>
          {parsed.rows.map(([label, value]) => (
            <DetailRow key={label} label={label} value={value} />
          ))}
        </dl>
      </Panel>
    </div>
  );
}
