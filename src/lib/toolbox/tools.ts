import {
  Binary,
  Braces,
  CaseSensitive,
  Clock3,
  Fingerprint,
  Hash,
  KeyRound,
  LinkIcon,
} from "lucide-react";
import type { ToolDefinition, ToolId } from "./types";

export const tools: ToolDefinition[] = [
  {
    id: "json",
    name: "JSON Formatter & Validator",
    shortName: "JSON",
    href: "/tools/json",
    description:
      "Memformat JSON agar rapi, memvalidasi struktur, dan membuat versi minified.",
    accent: "text-brand-cyan",
    icon: Braces,
  },
  {
    id: "jwt",
    name: "JWT Decoder",
    shortName: "JWT",
    href: "/tools/jwt",
    description:
      "Membaca header dan payload JWT tanpa memverifikasi tanda tangan token.",
    accent: "text-brand-blue",
    icon: KeyRound,
  },
  {
    id: "base64",
    name: "Base64 Encoder/Decoder",
    shortName: "Base64",
    href: "/tools/base64",
    description:
      "Mengubah teks UTF-8 menjadi Base64 atau mengembalikan Base64 menjadi teks.",
    accent: "text-brand-green",
    icon: Binary,
  },
  {
    id: "uuid",
    name: "UUID Generator",
    shortName: "UUID",
    href: "/tools/uuid",
    description:
      "Membuat UUID v4 acak untuk identifier, token sementara, atau data dummy.",
    accent: "text-brand-amber",
    icon: Fingerprint,
  },
  {
    id: "timestamp",
    name: "Unix Timestamp Converter",
    shortName: "Timestamp",
    href: "/tools/timestamp",
    description:
      "Mengubah Unix timestamp ke tanggal lokal, UTC, ISO, dan sebaliknya.",
    accent: "text-brand-coral",
    icon: Clock3,
  },
  {
    id: "url",
    name: "URL Parser",
    shortName: "URL",
    href: "/tools/url",
    description:
      "Memecah URL menjadi protocol, host, path, hash, dan query parameter.",
    accent: "text-brand-cyan",
    icon: LinkIcon,
  },
  {
    id: "hash",
    name: "Hash Generator",
    shortName: "Hash",
    href: "/tools/hash",
    description: "Membuat digest MD5 atau SHA untuk teks lokal di browser.",
    accent: "text-brand-green",
    icon: Hash,
  },
  {
    id: "case",
    name: "Case Converter",
    shortName: "Case",
    href: "/tools/case",
    description:
      "Mengubah teks ke camelCase, PascalCase, snake_case, kebab-case, dan format lain.",
    accent: "text-brand-blue",
    icon: CaseSensitive,
  },
];

export function isToolId(value: unknown): value is ToolId {
  return typeof value === "string" && tools.some((tool) => tool.id === value);
}

export function getToolDefinition(toolId: ToolId) {
  return tools.find((tool) => tool.id === toolId) ?? tools[0];
}
