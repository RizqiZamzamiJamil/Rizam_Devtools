"use client";

import { BookOpen, RotateCcw } from "lucide-react";
import { ToolButton } from "@/components/ui/tool-button";

export function ToolActions({
  compact = false,
  onExample,
  onReset,
}: {
  compact?: boolean;
  onExample: () => void | Promise<void>;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <ToolButton icon={BookOpen} onClick={onExample} size={compact ? "sm" : "md"}>
        Contoh
      </ToolButton>
      <ToolButton icon={RotateCcw} onClick={onReset} size={compact ? "sm" : "md"}>
        Reset
      </ToolButton>
    </div>
  );
}
