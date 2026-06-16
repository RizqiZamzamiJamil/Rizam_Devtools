import { md5 } from "js-md5";
import type { HashAlgorithm } from "./types";

export const hashAlgorithms: HashAlgorithm[] = [
  "MD5",
  "SHA-1",
  "SHA-256",
  "SHA-384",
  "SHA-512",
];

export function bytesToHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function createHashDigest(
  algorithm: HashAlgorithm,
  input: string,
) {
  if (algorithm === "MD5") return md5(input);

  const buffer = await crypto.subtle.digest(
    algorithm,
    new TextEncoder().encode(input),
  );

  return bytesToHex(buffer);
}
