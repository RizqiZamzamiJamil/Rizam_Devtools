import { Save } from "lucide-react";

export function AutosaveBadge({
  hydrated,
  compact = false,
  className = "",
}: {
  hydrated: boolean;
  compact?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.05] font-black text-white/58 ${
        compact ? "min-h-6 px-2 text-[0.65rem]" : "min-h-8 px-2.5 text-xs"
      } ${className}`}
    >
      <Save
        aria-hidden="true"
        className={compact ? "h-3 w-3" : "h-3.5 w-3.5"}
      />
      {hydrated ? "Local autosave" : "Menyiapkan autosave"}
    </span>
  );
}
