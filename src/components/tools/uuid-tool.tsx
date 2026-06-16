"use client";

import { Copy, Fingerprint } from "lucide-react";
import { Input } from "@/components/ui/form-fields";
import { Panel } from "@/components/ui/panel";
import { StatusPill } from "@/components/ui/status-pill";
import { ToolButton } from "@/components/ui/tool-button";
import { clampNumber } from "@/lib/toolbox/format";
import { createUuid } from "@/lib/toolbox/uuid";
import type { ToolProps } from "./tool-props";

export function UuidTool({
  copyText,
  showToast,
  updateWorkspace,
  workspace,
}: ToolProps) {
  function generate() {
    const count = clampNumber(Number(workspace.uuidCount), 1, 50, 5);
    updateWorkspace(
      "uuids",
      Array.from({ length: count }, () => createUuid()),
    );
    updateWorkspace("uuidCount", count);
    showToast("UUID generated");
  }

  return (
    <div className="grid items-start gap-4 xl:grid-cols-[22rem_minmax(0,1fr)]">
      <Panel className="p-4">
        <div className="grid gap-3">
          <Input
            label="Count"
            max={50}
            min={1}
            onChange={(value) =>
              updateWorkspace("uuidCount", clampNumber(Number(value), 1, 50, 1))
            }
            type="number"
            value={workspace.uuidCount}
          />
          <ToolButton icon={Fingerprint} onClick={generate} variant="primary">
            Generate
          </ToolButton>
          <ToolButton
            icon={Copy}
            onClick={() => copyText(workspace.uuids.join("\n"), "UUIDs copied")}
          >
            Copy all
          </ToolButton>
        </div>
      </Panel>

      <Panel className="overflow-hidden">
        <div className="shrink-0 border-b border-white/10 px-4 py-3">
          <StatusPill tone="ok">Version 4</StatusPill>
        </div>
        <div
          className="max-h-[min(34rem,calc(100svh-13rem))] divide-y divide-white/10 overflow-y-auto"
          data-testid="uuid-output-list"
        >
          {workspace.uuids.map((uuid) => (
            <div
              className="flex min-w-0 items-center justify-between gap-3 px-4 py-3"
              key={uuid}
            >
              <code className="min-w-0 break-all font-mono text-sm text-white/86">
                {uuid}
              </code>
              <button
                aria-label="Copy UUID"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.055] text-white/70 transition hover:border-brand-cyan/40 hover:text-white"
                onClick={() => copyText(uuid, "UUID copied")}
                type="button"
              >
                <Copy aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
