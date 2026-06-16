import { decodeBase64ToUtf8 } from "./base64";

export function decodeJwtPart(part: string) {
  return JSON.parse(decodeBase64ToUtf8(part));
}
