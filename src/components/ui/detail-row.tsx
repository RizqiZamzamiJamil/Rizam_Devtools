export function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="grid gap-1 border-b border-white/10 py-3 last:border-0 sm:grid-cols-[10rem_1fr]">
      <dt className="text-xs font-black uppercase text-white/42">{label}</dt>
      <dd className="min-w-0 break-all font-mono text-sm text-white/82">
        {String(value)}
      </dd>
    </div>
  );
}
