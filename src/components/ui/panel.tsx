export function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-lg border border-white/10 bg-brand-panel-soft shadow-panel ${className}`}
    >
      {children}
    </section>
  );
}
