import CopyButton from "@/components/CopyButton";
import ToolColumns from "@/components/ToolColumns";
import ToolPanel from "@/components/ToolPanel";
import ToolLayout from "@/layouts/ToolLayout";
import { useToolState } from "@/utils/useToolState";
import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Fingerprint } from "lucide-react";
import { useState } from "react";

function createUuid() {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export default function UuidPage() {
  const [state, setState, storageAvailable] = useToolState({
    uuidCount: 5,
    uuids: [] as string[],
  });
  const [error, setError] = useState("");
  function generate(count = state.uuidCount) {
    if (!Number.isInteger(count) || count < 1 || count > 50) {
      setError("Jumlah harus bilangan bulat antara 1 dan 50.");
      return;
    }
    try {
      const uuids = Array.from({ length: count }, createUuid);
      setState({ uuidCount: count, uuids });
      setError("");
    } catch {
      setError("Generator acak tidak tersedia pada browser ini.");
    }
  }

  return (
    <ToolLayout
      id="uuid"
      storageAvailable={storageAvailable}
      onExample={() => generate(5)}
      onReset={() => {
        setState({ uuidCount: 5, uuids: [] });
        setError("");
      }}
    >
      <ToolColumns>
        <ToolPanel title="Pengaturan">
          <Stack spacing={2}>
            <TextField
              label="Jumlah UUID"
              type="number"
              value={state.uuidCount}
              onChange={(event) =>
                setState({ ...state, uuidCount: Number(event.target.value) })
              }
              slotProps={{ htmlInput: { min: 1, max: 50, step: 1 } }}
              helperText="1 sampai 50 UUID per batch"
            />
            <Button
              variant="contained"
              startIcon={<Fingerprint size={17} />}
              onClick={() => generate()}
            >
              Buat UUID
            </Button>
            {error && <Alert severity="error">{error}</Alert>}
            <Typography variant="body2" color="text.secondary">
              Versi 4 menggunakan bilangan acak. Setiap UUID bisa disalin
              sendiri atau sekaligus.
            </Typography>
          </Stack>
        </ToolPanel>
        <ToolPanel
          title={`Hasil (${state.uuids.length})`}
          action={
            <CopyButton value={state.uuids.join("\n")} label="Salin semua" />
          }
        >
          <Box data-testid="uuid-output-list">
            {state.uuids.length ? (
              state.uuids.map((uuid, index) => (
                <Box
                  key={`${uuid}-${index}`}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: { xs: "wrap", lg: "nowrap" },
                    gap: 1.5,
                    py: 1.5,
                    borderBottom: 1,
                    borderColor: "divider",
                    "&:last-child": { borderBottom: 0 },
                  }}
                >
                  <Typography
                    component="code"
                    sx={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "0.875rem",
                      overflowWrap: "anywhere",
                      minWidth: 0,
                    }}
                  >
                    {uuid}
                  </Typography>
                  <CopyButton value={uuid} label={`Salin #${index + 1}`} />
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text.white" sx={{ py: 4 }}>
                Tekan “Buat UUID” untuk membuat batch pertama.
              </Typography>
            )}
          </Box>
        </ToolPanel>
      </ToolColumns>
    </ToolLayout>
  );
}
