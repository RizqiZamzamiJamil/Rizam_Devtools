import CopyButton from "@/components/CopyButton";
import DetailList from "@/components/DetailList";
import ToolPanel from "@/components/ToolPanel";
import ToolLayout from "@/layouts/ToolLayout";
import { useToolState } from "@/utils/useToolState";
import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import { ArrowRight, Clock3 } from "lucide-react";
import { useState } from "react";
import ToolColumns from "@/components/ToolColumns";

function localDate(date: Date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
    .toISOString()
    .slice(0, 16);
}

export default function TimestampPage() {
  const [state, setState, storageAvailable] = useToolState({
    timestampInput: "",
    dateInput: "",
  });
  const [dateError, setDateError] = useState("");
  let rows: [string, string | number][] = [];
  let error = "";
  if (state.timestampInput.trim()) {
    const raw = state.timestampInput.trim();
    const numeric = Number(raw);
    const date = new Date(
      Math.abs(numeric) < 1_000_000_000_000 ? numeric * 1000 : numeric,
    );
    if (
      !/^-?\d+(\.\d+)?$/.test(raw) ||
      !Number.isFinite(numeric) ||
      Number.isNaN(date.getTime())
    )
      error = "Timestamp tidak valid. Masukkan angka detik atau milidetik.";
    else
      rows = [
        ["Seconds", Math.floor(date.getTime() / 1000)],
        ["Milliseconds", date.getTime()],
        ["Local", date.toLocaleString()],
        ["UTC", date.toUTCString()],
        ["ISO", date.toISOString()],
        ["Date input", localDate(date)],
      ];
  }

  function applyDate(date: Date) {
    setState({
      timestampInput: String(Math.floor(date.getTime() / 1000)),
      dateInput: localDate(date),
    });
    setDateError("");
  }

  function convertDate() {
    const date = new Date(state.dateInput);
    if (Number.isNaN(date.getTime())) {
      setDateError("Pilih tanggal dan waktu yang valid.");
      return;
    }
    applyDate(date);
  }

  return (
    <ToolLayout
      id="timestamp"
      storageAvailable={storageAvailable}
      onExample={() => applyDate(new Date("2024-06-02T00:00:00.000Z"))}
      onReset={() => {
        setState({ timestampInput: "", dateInput: "" });
        setDateError("");
      }}
    >
      <ToolColumns>
        <ToolPanel title="Waktu asal">
          <Stack spacing={2}>
            <TextField
              label="Unix timestamp"
              fullWidth
              value={state.timestampInput}
              onChange={(event) =>
                setState({
                  ...state,
                  timestampInput: event.target.value,
                })
              }
              slotProps={{ htmlInput: { inputMode: "decimal" } }}
              helperText="Detik atau milidetik terdeteksi otomatis."
            />
            <Button
              variant="contained"
              onClick={() => applyDate(new Date())}
              startIcon={<Clock3 size={17} />}
            >
              Gunakan waktu sekarang
            </Button>
            <TextField
              label="Tanggal lokal"
              type="datetime-local"
              fullWidth
              value={state.dateInput}
              onChange={(event) =>
                setState({
                  ...state,
                  dateInput: event.target.value,
                })
              }
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <Button onClick={convertDate} endIcon={<ArrowRight size={17} />}>
              Ubah ke timestamp
            </Button>
            {dateError && <Alert severity="error">{dateError}</Alert>}
          </Stack>
        </ToolPanel>
        <ToolPanel
          title="Hasil konversi"
          action={
            <CopyButton
              value={rows.map(([key, value]) => `${key}: ${value}`).join("\n")}
            />
          }
        >
          {error ? (
            <Alert severity="error">{error}</Alert>
          ) : rows.length ? (
            <DetailList rows={rows} />
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ py: 4 }}>
              Masukkan timestamp atau pilih waktu sekarang.
            </Typography>
          )}
        </ToolPanel>
      </ToolColumns>
    </ToolLayout>
  );
}
