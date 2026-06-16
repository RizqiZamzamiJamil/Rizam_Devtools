import type { LucideIcon } from "lucide-react";

export type ToolId =
  | "json"
  | "jwt"
  | "base64"
  | "uuid"
  | "timestamp"
  | "url"
  | "hash"
  | "case";

export type Base64Mode = "encode" | "decode";
export type UrlCodecMode = "encode" | "decode";
export type HashAlgorithm = "MD5" | "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

export type WorkspaceState = {
  jsonInput: string;
  jsonOutput: string;
  jsonStatus: string;
  jwtInput: string;
  base64Input: string;
  base64Mode: Base64Mode;
  uuidCount: number;
  uuids: string[];
  timestampInput: string;
  dateInput: string;
  urlInput: string;
  urlCodecInput: string;
  urlCodecMode: UrlCodecMode;
  hashInput: string;
  hashAlgorithm: HashAlgorithm;
  hashOutput: string;
  caseInput: string;
};

export type PersistedState = {
  activeTool?: ToolId;
  workspace?: Partial<WorkspaceState>;
};

export type ToolDefinition = {
  id: ToolId;
  name: string;
  shortName: string;
  href: string;
  description: string;
  accent: string;
  icon: LucideIcon;
};

export type WorkspaceUpdater = <K extends keyof WorkspaceState>(
  key: K,
  value: WorkspaceState[K],
) => void;
