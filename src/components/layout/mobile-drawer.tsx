"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sidebar } from "./sidebar";
import type { ToolId } from "@/lib/toolbox/types";

export function MobileDrawer({
  activeTool,
  isOpen,
  onClose,
}: {
  activeTool: ToolId;
  isOpen: boolean;
  onClose: () => void;
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
            className="fixed inset-y-0 right-0 z-50 flex w-[min(23rem,88vw)] flex-col border-l border-white/12 bg-[#070b14] p-3 shadow-[-28px_0_70px_rgba(0,0,0,0.42)] lg:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            <div className="min-h-0 flex-1">
              <Sidebar
                activeTool={activeTool}
                onClose={onClose}
                onNavigate={onClose}
              />
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
