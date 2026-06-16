"use client";

import Image from "next/image";
import { BookOpen, Info } from "lucide-react";
import { HamburgerButton } from "./hamburger-button";
import { StatusPill } from "@/components/ui/status-pill";
import { ToolButton } from "@/components/ui/tool-button";
import type { ToolDefinition } from "@/lib/toolbox/types";

export function ToolHeader({
  definition,
  hydrated,
  isSidebarOpen,
  onExample,
  onToggleSidebar,
}: {
  definition: ToolDefinition;
  hydrated: boolean;
  isSidebarOpen: boolean;
  onExample: () => void | Promise<void>;
  onToggleSidebar: () => void;
}) {
  const ActiveIcon = definition.icon;

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#05070d]/80 px-4 py-3 backdrop-blur lg:px-5">
      <div className="mx-auto flex w-full max-w-[96rem] items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3 lg:hidden">
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
          <div className="min-w-0">
            <p className="text-[0.68rem] font-black uppercase text-brand-cyan">
              Developer Tools | Rizam
            </p>
            <h1 className="truncate font-display text-xl font-black text-white">
              Rizam DevTools
            </h1>
          </div>
        </div>

        <div className="hidden min-w-0 items-center gap-3 lg:flex">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-brand-cyan/24 bg-[#05070d] shadow-cyan">
            <Image
              alt="Rizam DevTools"
              className="h-9 w-9 object-contain"
              height={96}
              priority
              src="/brand-mark.png"
              width={96}
            />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-black uppercase text-brand-cyan">
              devtools.rizam.fun
            </p>
            <h1 className="truncate font-display text-2xl font-black text-white">
              Rizam DevTools
            </h1>
          </div>
        </div>

        <HamburgerButton
          isOpen={isSidebarOpen}
          onClick={onToggleSidebar}
        />
      </div>

      <div className="mx-auto mt-4 flex w-full max-w-[96rem] flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.055]">
            <ActiveIcon
              aria-hidden="true"
              className={`h-5 w-5 ${definition.accent}`}
            />
          </span>
          <h2 className="min-w-0 truncate font-display text-2xl font-black text-white">
            {definition.name}
          </h2>
          <span
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.045] text-white/52"
            title={definition.description}
          >
            <Info aria-hidden="true" className="h-4 w-4" />
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <ToolButton icon={BookOpen} onClick={onExample}>
            Contoh
          </ToolButton>
          <StatusPill tone={hydrated ? "ok" : "warn"}>
            {hydrated ? "Browser storage active" : "Opening workspace"}
          </StatusPill>
        </div>
      </div>
    </header>
  );
}
