"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Info, RotateCcw } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { StatusPill } from "@/components/ui/status-pill";
import { ToolButton } from "@/components/ui/tool-button";
import { tools } from "@/lib/toolbox/tools";
import type { ToolId } from "@/lib/toolbox/types";

export function Sidebar({
  activeTool,
  hydrated,
  onReset,
  onNavigate,
}: {
  activeTool: ToolId;
  hydrated: boolean;
  onReset: () => void;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <Panel className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="shrink-0 border-b border-white/10 px-4 py-3">
        <p className="text-xs font-black uppercase text-white/42">Toolbox</p>
      </div>

      <nav
        aria-label="Developer tools"
        className="min-h-0 flex-1 space-y-1 overflow-y-auto p-2 pb-24"
      >
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = tool.id === activeTool || pathname === tool.href;

          return (
            <Link
              className={`flex h-12 w-full items-center gap-3 rounded-lg border px-3 text-left transition ${
                isActive
                  ? "border-brand-cyan/40 bg-brand-cyan/12 text-white"
                  : "border-transparent text-white/62 hover:border-white/10 hover:bg-white/[0.055] hover:text-white"
              }`}
              href={tool.href}
              key={tool.id}
              onClick={onNavigate}
              title={tool.description}
            >
              <Icon
                aria-hidden="true"
                className={`h-4.5 w-4.5 shrink-0 ${tool.accent}`}
              />
              <span className="min-w-0 flex-1 truncate text-sm font-extrabold">
                {tool.shortName}
              </span>
              <Info
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 text-white/38"
              />
            </Link>
          );
        })}
      </nav>

      <div className="shrink-0 border-t border-white/10 bg-brand-panel-soft p-3 shadow-[0_-18px_35px_rgba(0,0,0,0.24)]">
        <div className="grid gap-2">
          <StatusPill tone="muted" className="justify-center">
            {hydrated ? "Local autosave" : "Local workspace"}
          </StatusPill>
          <ToolButton icon={RotateCcw} onClick={onReset}>
            Reset
          </ToolButton>
        </div>
      </div>
    </Panel>
  );
}
