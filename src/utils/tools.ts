import {
  Braces,
  KeyRound,
  Binary,
  Fingerprint,
  Clock3,
  Link2,
  Hash,
  CaseSensitive,
} from "lucide-react";

export const tools = [
  {
    id: "json",
    label: "JSON",
    title: "JSON Formatter",
    description: "Rapikan, padatkan, dan validasi JSON.",
    group: "Data",
    icon: Braces,
  },
  {
    id: "jwt",
    label: "JWT",
    title: "JWT Decoder",
    description: "Baca header, payload, dan klaim sebuah token.",
    group: "Data",
    icon: KeyRound,
  },
  {
    id: "base64",
    label: "Base64",
    title: "Base64 Converter",
    description: "Encode dan decode teks UTF-8, termasuk emoji.",
    group: "Data",
    icon: Binary,
  },
  {
    id: "uuid",
    label: "UUID",
    title: "UUID Generator",
    description: "Buat UUID versi 4 dalam satu batch.",
    group: "Generator",
    icon: Fingerprint,
  },
  {
    id: "hash",
    label: "Hash",
    title: "Hash Generator",
    description: "Hitung digest teks dengan MD5 atau SHA.",
    group: "Generator",
    icon: Hash,
  },
  {
    id: "timestamp",
    label: "Timestamp",
    title: "Timestamp Converter",
    description: "Konversi Unix timestamp dan tanggal lokal.",
    group: "Web & teks",
    icon: Clock3,
  },
  {
    id: "url",
    label: "URL",
    title: "URL Parser",
    description: "Uraikan alamat URL dan konversi karakter URI.",
    group: "Web & teks",
    icon: Link2,
  },
  {
    id: "case",
    label: "Case",
    title: "Case Converter",
    description: "Ubah penulisan teks dan nama variabel.",
    group: "Web & teks",
    icon: CaseSensitive,
  },
] as const;

export type ToolId = (typeof tools)[number]["id"];
