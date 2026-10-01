import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

const storageKey = "rizam-devtools-workspace-v1";
type State = Record<string, string | number | string[]>;

function readWorkspace(): Record<string, unknown> {
  const raw = localStorage.getItem(storageKey);
  if (!raw) return {};
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return {};
  }
  if (!parsed || typeof parsed !== "object" || !("workspace" in parsed))
    return {};
  const workspace = parsed.workspace;
  return workspace && typeof workspace === "object"
    ? (workspace as Record<string, unknown>)
    : {};
}

export function useToolState<T extends State>(defaults: T) {
  const initial = useRef(defaults);
  const [state, setState] = useState<T>(defaults);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const current = useRef(state);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = readWorkspace();
        const next = { ...initial.current };
        for (const key of Object.keys(next) as (keyof T)[]) {
          const value = saved[String(key)];
          const fallback = next[key];
          if (Array.isArray(fallback)) {
            if (
              Array.isArray(value) &&
              value.every((item) => typeof item === "string")
            )
              next[key] = value as T[keyof T];
          } else if (
            typeof value === typeof fallback &&
            (typeof value !== "number" || Number.isFinite(value))
          ) {
            next[key] = value as T[keyof T];
          }
        }
        current.current = next;
        setState(next);
      } catch {
        setStorageAvailable(false);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const update: Dispatch<SetStateAction<T>> = (value) => {
    const next = typeof value === "function" ? value(current.current) : value;
    current.current = next;
    setState(next);
    try {
      // Merge only this page's fields so other tools keep their saved input.
      localStorage.setItem(
        storageKey,
        JSON.stringify({ workspace: { ...readWorkspace(), ...next } }),
      );
      setStorageAvailable(true);
    } catch {
      setStorageAvailable(false);
    }
  };

  return [state, update, storageAvailable] as const;
}
