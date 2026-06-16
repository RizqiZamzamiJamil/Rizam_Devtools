import { SAMPLE_URL } from "./examples";
import { clampNumber } from "./format";
import { hashAlgorithms } from "./hash";
import { toDateTimeLocal } from "./time";
import type { PersistedState, WorkspaceState } from "./types";
import { createUuid } from "./uuid";

export const STORAGE_KEY = "rizam-devtools-workspace-v1";

export const INITIAL_WORKSPACE: WorkspaceState = {
  jsonInput:
    '{\n  "name": "Rizam DevTools",\n  "stack": ["Next.js", "Tailwind"],\n  "clientOnly": true\n}',
  jsonOutput: "",
  jsonStatus: "Ready",
  jwtInput: "",
  base64Input: "Rizam DevTools",
  base64Mode: "encode",
  uuidCount: 5,
  uuids: [],
  timestampInput: "",
  dateInput: "",
  urlInput: SAMPLE_URL,
  urlCodecInput: "devtools/rizam fun?tool=json",
  urlCodecMode: "encode",
  hashInput: "Rizam DevTools",
  hashAlgorithm: "SHA-256",
  hashOutput: "",
  caseInput: "rizam developer toolbox",
};

export function getRuntimeDefaults(): Pick<
  WorkspaceState,
  "timestampInput" | "dateInput" | "uuids"
> {
  const now = new Date();

  return {
    timestampInput: String(Math.floor(now.getTime() / 1000)),
    dateInput: toDateTimeLocal(now),
    uuids: Array.from({ length: 5 }, () => createUuid()),
  };
}

export function mergeWorkspace(saved?: Partial<WorkspaceState>): WorkspaceState {
  const runtimeDefaults = getRuntimeDefaults();
  const next = {
    ...INITIAL_WORKSPACE,
    ...runtimeDefaults,
    ...saved,
  };

  return {
    ...next,
    uuidCount: clampNumber(Number(next.uuidCount), 1, 50, 5),
    base64Mode: next.base64Mode === "decode" ? "decode" : "encode",
    urlCodecMode: next.urlCodecMode === "decode" ? "decode" : "encode",
    hashAlgorithm: hashAlgorithms.includes(next.hashAlgorithm)
      ? next.hashAlgorithm
      : "SHA-256",
    uuids:
      Array.isArray(next.uuids) && next.uuids.length > 0
        ? next.uuids
        : runtimeDefaults.uuids,
  };
}

export function readPersistedWorkspace() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { workspace: mergeWorkspace() };

    const parsed = JSON.parse(raw) as PersistedState;
    return {
      activeTool: parsed.activeTool,
      workspace: mergeWorkspace(parsed.workspace),
    };
  } catch {
    return { workspace: mergeWorkspace() };
  }
}
