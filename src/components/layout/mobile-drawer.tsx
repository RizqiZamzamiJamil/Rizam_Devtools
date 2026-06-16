"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Sidebar } from "./sidebar";
import type { ToolId } from "@/lib/toolbox/types";

export function MobileDrawer({
  activeTool,
  hydrated,
  isOpen,
  onClose,
  onReset,
}: {
  activeTool: ToolId;
  hydrated: boolean;
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            aria-label="Tutup sidebar toolbox"
            className="fixed inset-0 z-40 border-0 bg-black/62 backdrop-blur-[5px] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.18 }}
            type="button"
          />
          <motion.aside
            aria-label="Mobile toolbox sidebar"
            className="fixed inset-y-0 right-0 z-50 flex w-[min(22rem,86vw)] flex-col gap-3 border-l border-white/12 bg-[#070b14] p-3 shadow-[-28px_0_70px_rgba(0,0,0,0.42)] lg:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            <div className="flex shrink-0 items-center justify-between gap-3 rounded-lg border border-white/10 bg-brand-panel-soft px-3 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <Image
                  alt="Rizam DevTools"
                  className="h-9 w-9 object-contain"
                  height={96}
                  src="/brand-mark.png"
                  width={96}
                />
                <p className="truncate text-sm font-black text-white">
                  Rizam DevTools
                </p>
              </div>
              <button
                aria-label="Tutup sidebar toolbox"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.055] text-white/80 transition hover:border-brand-cyan/40 hover:text-white"
                onClick={onClose}
                type="button"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
            <div className="min-h-0 flex-1">
              <Sidebar
                activeTool={activeTool}
                hydrated={hydrated}
                onNavigate={onClose}
                onReset={onReset}
              />
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
