import { AlertTriangle, CheckCircle2, Save } from "lucide-react";

export function StatusPill({
  tone,
  children,
  className = "",
}: {
  tone: "ok" | "warn" | "muted";
  children: React.ReactNode;
  className?: string;
}) {
  const styles = {
    ok: "border-brand-green/30 bg-brand-green/10 text-brand-green",
    warn: "border-brand-amber/30 bg-brand-amber/10 text-brand-amber",
    muted: "border-white/10 bg-white/[0.05] text-white/55",
  };

  return (
    <span
      className={`inline-flex min-h-8 items-center gap-2 rounded-lg border px-2.5 text-xs font-black ${styles[tone]} ${className}`}
    >
      {tone === "ok" ? (
        <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5" />
      ) : tone === "warn" ? (
        <AlertTriangle aria-hidden="true" className="h-3.5 w-3.5" />
      ) : (
        <Save aria-hidden="true" className="h-3.5 w-3.5" />
      )}
      {children}
    </span>
  );
}
