"use client";

import { Copy } from "lucide-react";
import { useMemo } from "react";
import { TextArea } from "@/components/ui/form-fields";
import { Panel } from "@/components/ui/panel";
import { buildCaseResults } from "@/lib/toolbox/case";
import type { ToolProps } from "./tool-props";

export function CaseTool({ copyText, updateWorkspace, workspace }: ToolProps) {
  const results = useMemo(
    () => buildCaseResults(workspace.caseInput),
    [workspace.caseInput],
  );

  return (
    <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <Panel className="p-4">
        <TextArea
          heightClass="h-64"
          label="Input"
          onChange={(value) => updateWorkspace("caseInput", value)}
          testId="case-input"
          value={workspace.caseInput}
        />
      </Panel>

      <Panel className="overflow-hidden">
        <div
          className="max-h-[min(34rem,calc(100svh-13rem))] divide-y divide-white/10 overflow-y-auto"
          data-testid="case-output-list"
        >
          {results.map((item) => (
            <div className="grid gap-2 px-4 py-3" key={item.label}>
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-black uppercase text-white/42">
                  {item.label}
                </span>
                <button
                  aria-label={`Copy ${item.label}`}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.055] text-white/70 transition hover:border-brand-cyan/40 hover:text-white"
                  onClick={() => copyText(item.value, `${item.label} copied`)}
                  type="button"
                >
                  <Copy aria-hidden="true" className="h-3.5 w-3.5" />
                </button>
              </div>
              <code className="min-w-0 break-all font-mono text-sm text-white/86">
                {item.value}
              </code>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
