import { Alert, Stack, Typography } from "@mui/material";
import ToolLayout from "@/layouts/ToolLayout";
import ToolPanel from "@/components/ToolPanel";
import Editor from "@/components/Editor";
import CopyButton from "@/components/CopyButton";
import DetailList from "@/components/DetailList";
import ToolColumns from "@/components/ToolColumns";
import { useToolState } from "@/utils/useToolState";

const example =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZXZlbG9wZXIiLCJuYW1lIjoiRGVtb3VzZXIiLCJpYXQiOjE3MTcyODY0MDAsImV4cCI6MTg5MzQ1NjAwMH0.demo-signature";

function decodePart(part: string): Record<string, unknown> {
  const normalized = part.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(
    normalized.length + ((4 - (normalized.length % 4)) % 4),
    "=",
  );
  const bytes = Uint8Array.from(atob(padded), (char) => char.charCodeAt(0));
  const value: unknown = JSON.parse(
    new TextDecoder("utf-8", { fatal: true }).decode(bytes),
  );
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error("Header dan payload harus berupa objek JSON.");
  return value as Record<string, unknown>;
}

function claimDate(value: unknown) {
  if (typeof value !== "number" || !Number.isFinite(value)) return "";
  const date = new Date(value * 1000);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleString();
}

export default function JwtPage() {
  const [state, setState, storageAvailable] = useToolState({ jwtInput: "" });
  let header = "";
  let payload = "";
  let error = "";
  let claims: [string, string | number][] = [];
  if (state.jwtInput.trim()) {
    try {
      const parts = state.jwtInput.trim().split(".");
      if (parts.length !== 3)
        throw new Error(
          "JWT harus terdiri dari tiga bagian yang dipisahkan titik.",
        );
      const decodedHeader = decodePart(parts[0]);
      const decodedPayload = decodePart(parts[1]);
      header = JSON.stringify(decodedHeader, null, 2);
      payload = JSON.stringify(decodedPayload, null, 2);
      const entries: [string, unknown][] = [
        ["Issuer", decodedPayload.iss],
        ["Subject", decodedPayload.sub],
        ["Audience", decodedPayload.aud],
        ["Issued at", claimDate(decodedPayload.iat)],
        ["Not before", claimDate(decodedPayload.nbf)],
        ["Expires", claimDate(decodedPayload.exp)],
        ["Algorithm", decodedHeader.alg],
        ["Type", decodedHeader.typ],
      ];
      claims = entries
        .filter(([, value]) => value !== undefined && value !== "")
        .map(([label, value]) => [
          label,
          typeof value === "object" ? JSON.stringify(value) : String(value),
        ]);
    } catch (cause) {
      error = cause instanceof Error ? cause.message : "Token tidak valid.";
    }
  }

  return (
    <ToolLayout
      id="jwt"
      storageAvailable={storageAvailable}
      onExample={() => setState({ jwtInput: example })}
      onReset={() => setState({ jwtInput: "" })}
    >
      <Alert severity="info" sx={{ mb: 1.5 }}>
        Decode hanya membaca token. Tanda tangan JWT tidak diverifikasi.
      </Alert>
      <ToolColumns>
        <ToolPanel title="Token">
          <Editor
            label="JWT token"
            testId="jwt-token"
            value={state.jwtInput}
            onChange={(value) => setState({ jwtInput: value })}
            placeholder="header.payload.signature"
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </ToolPanel>
        <Stack spacing={2}>
          <ToolPanel
            title="Header"
            action={<CopyButton label="Salin header" value={header} />}
          >
            <Editor
              label="JWT header"
              compact
              testId="jwt-header"
              readOnly
              value={header}
              placeholder="Header belum tersedia."
            />
          </ToolPanel>
          <ToolPanel
            title="Payload"
            action={<CopyButton label="Salin payload" value={payload} />}
          >
            <Editor
              label="JWT payload"
              testId="jwt-payload"
              readOnly
              value={payload}
              placeholder="Payload belum tersedia."
            />
          </ToolPanel>
          <ToolPanel title="Klaim">
            {claims.length ? (
              <DetailList rows={claims} />
            ) : (
              <Typography variant="body2" color="text.secondary">
                Tempel token valid untuk melihat klaim.
              </Typography>
            )}
          </ToolPanel>
        </Stack>
      </ToolColumns>
    </ToolLayout>
  );
}
