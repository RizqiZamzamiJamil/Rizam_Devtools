export function TextArea({
  label,
  value,
  onChange,
  readOnly = false,
  heightClass = "h-64",
  testId,
}: {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  heightClass?: string;
  testId?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase text-white/48">
        {label}
      </span>
      <textarea
        className={`${heightClass} w-full resize-none rounded-lg border border-white/10 bg-black p-4 font-mono text-sm leading-6 text-white outline-none transition placeholder:text-white/28 focus:border-brand-cyan/60 focus:ring-2 focus:ring-brand-cyan/15`}
        data-testid={testId}
        onChange={(event) => onChange?.(event.target.value)}
        readOnly={readOnly}
        spellCheck={false}
        value={value}
      />
    </label>
  );
}

export function Input({
  label,
  value,
  onChange,
  type = "text",
  min,
  max,
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  min?: number;
  max?: number;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase text-white/48">
        {label}
      </span>
      <input
        className="h-11 w-full rounded-lg border border-white/10 bg-black px-3 font-mono text-sm text-white outline-none transition focus:border-brand-cyan/60 focus:ring-2 focus:ring-brand-cyan/15"
        max={max}
        min={min}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        value={value}
      />
    </label>
  );
}

export function Select<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: T[];
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase text-white/48">
        {label}
      </span>
      <select
        className="h-11 w-full rounded-lg border border-white/10 bg-black px-3 font-mono text-sm text-white outline-none transition focus:border-brand-cyan/60 focus:ring-2 focus:ring-brand-cyan/15"
        onChange={(event) => onChange(event.target.value as T)}
        value={value}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
