import type { LucideIcon } from "lucide-react";

export function ToolButton({
  children,
  icon: Icon,
  onClick,
  size = "md",
  variant = "neutral",
  disabled = false,
  className = "",
}: {
  children: React.ReactNode;
  icon: LucideIcon;
  onClick: () => void | Promise<void>;
  size?: "sm" | "md";
  variant?: "primary" | "neutral" | "danger";
  disabled?: boolean;
  className?: string;
}) {
  const variants = {
    primary:
      "border-brand-cyan/45 bg-[#0b2a35] text-white hover:border-brand-cyan hover:bg-[#123b47]",
    neutral:
      "border-white/10 bg-white/[0.055] text-white/82 hover:border-white/25 hover:bg-white/[0.09] hover:text-white",
    danger:
      "border-brand-coral/35 bg-[#361719] text-brand-coral hover:border-brand-coral/70 hover:bg-[#4a1c1f]",
  };
  const sizes = {
    sm: "min-h-8 gap-1.5 px-2.5 text-xs",
    md: "min-h-10 gap-2 px-3 text-sm",
  };
  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg border font-extrabold transition disabled:cursor-not-allowed disabled:opacity-45 ${sizes[size]} ${variants[variant]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <Icon aria-hidden="true" className={`${iconSize} shrink-0`} />
      <span className="truncate">{children}</span>
    </button>
  );
}
