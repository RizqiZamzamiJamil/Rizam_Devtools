"use client";

import Image from "next/image";
import { Info } from "lucide-react";
import { HamburgerButton } from "./hamburger-button";
import { ToolActions } from "./tool-actions";
import { AutosaveBadge } from "@/components/ui/autosave-badge";
import type { ToolDefinition } from "@/lib/toolbox/types";

export function ToolHeader({
  definition,
  hydrated,
  isSidebarOpen,
  onExample,
  onReset,
  onToggleSidebar,
}: {
  definition: ToolDefinition;
  hydrated: boolean;
  isSidebarOpen: boolean;
  onExample: () => void | Promise<void>;
  onReset: () => void;
  onToggleSidebar: () => void;
}) {
  const ActiveIcon = definition.icon;

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#05070d]/82 px-3 py-2.5 backdrop-blur lg:px-5 lg:py-3">
      <div className="mx-auto flex w-full max-w-[96rem] items-center justify-between gap-3">
        <div className="flex min-w-0 items-start gap-2.5 lg:hidden">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-brand-cyan/24 bg-[#05070d] shadow-cyan sm:h-10 sm:w-10">
            <Image
              alt="Rizam DevTools"
              className="h-7 w-7 object-contain sm:h-7.5 sm:w-7.5"
              height={96}
              priority
              src="/brand-mark.png"
              width={96}
            />
          </span>
          <div className="min-w-0">
            <p className="text-[0.56rem] font-black uppercase leading-none text-brand-cyan sm:text-[0.62rem]">
              Developer Tools | Rizam
            </p>
            <div className="mt-1 flex min-w-0 items-center gap-1.5">
              <h1 className="truncate font-display text-base font-black leading-tight text-white sm:text-lg">
                {definition.name}
              </h1>
              <span
                className="grid h-6 w-6 shrink-0 place-items-center rounded-md border border-white/10 bg-white/[0.045] text-white/52"
                title={definition.description}
              >
                <Info aria-hidden="true" className="h-3.5 w-3.5" />
              </span>
            </div>
            <AutosaveBadge
              compact
              hydrated={hydrated}
              className="mt-1 max-w-full"
            />
          </div>
        </div>

        <div className="hidden min-w-0 items-center gap-3 lg:flex">
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
          <AutosaveBadge hydrated={hydrated} />
        </div>

        <div className="hidden lg:block">
          <ToolActions onExample={onExample} onReset={onReset} />
        </div>

        <HamburgerButton isOpen={isSidebarOpen} onClick={onToggleSidebar} />
      </div>
    </header>
  );
}
