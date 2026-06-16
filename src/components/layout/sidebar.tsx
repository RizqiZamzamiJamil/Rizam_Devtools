"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Info, X } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { tools } from "@/lib/toolbox/tools";
import type { ToolId } from "@/lib/toolbox/types";

export function Sidebar({
  activeTool,
  onClose,
  onNavigate,
}: {
  activeTool: ToolId;
  onClose?: () => void;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <Panel className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-3 py-3">
        <Link
          className="flex min-w-0 items-center gap-3"
          href="/"
          onClick={onNavigate}
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-brand-cyan/24 bg-[#05070d] shadow-cyan">
            <Image
              alt="Rizam DevTools"
              className="h-8 w-8 object-contain"
              height={96}
              priority
              src="/brand-mark.png"
              width={96}
            />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[0.66rem] font-black uppercase text-brand-cyan">
              Developer Tools | Rizam
            </span>
            <span className="block truncate font-display text-xl font-black text-white">
              Rizam DevTools
            </span>
          </span>
        </Link>
        {onClose ? (
          <button
            aria-label="Tutup sidebar toolbox"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.055] text-white/80 transition hover:border-brand-cyan/40 hover:text-white"
            onClick={onClose}
            type="button"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      <div className="shrink-0 border-b border-white/10 px-4 py-3">
        <p className="text-xs font-black uppercase text-white/42">Toolbox</p>
      </div>

      <nav
        aria-label="Developer tools"
        className="min-h-0 flex-1 space-y-1 overflow-y-auto p-2"
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
    </Panel>
  );
}
