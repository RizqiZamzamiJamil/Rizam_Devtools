export function toDateTimeLocal(date: Date) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
}

export function formatUnixDate(value: unknown) {
  if (typeof value !== "number" || !Number.isFinite(value)) return "";
  return new Date(value * 1000).toLocaleString();
}
