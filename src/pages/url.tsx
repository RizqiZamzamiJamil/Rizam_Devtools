import {
  TextField,
  Typography,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Alert,
} from "@mui/material";
import { ArrowLeftRight } from "lucide-react";
import ToolLayout from "@/layouts/ToolLayout";
import ToolPanel from "@/components/ToolPanel";
import Editor from "@/components/Editor";
import CopyButton from "@/components/CopyButton";
import DetailList from "@/components/DetailList";
import ToolColumns from "@/components/ToolColumns";
import { useToolState } from "@/utils/useToolState";

const defaults = { urlInput: "", urlCodecInput: "", urlCodecMode: "encode" };

export default function UrlPage() {
  const [state, setState, storageAvailable] = useToolState(defaults);
  const mode = state.urlCodecMode === "decode" ? "decode" : "encode";
  let rows: [string, string | number][] = [];
  let params: [string, string][] = [];
  let error = "";
  const raw = state.urlInput.trim();
  if (raw) {
    try {
      const normalized = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(raw)
        ? raw
        : `https://${raw}`;
      const url = new URL(normalized);
      rows = [
        ["Protocol", url.protocol],
        ["Username", url.username],
        ["Password", url.password ? "Set" : ""],
        ["Host", url.host],
        ["Hostname", url.hostname],
        ["Port", url.port],
        ["Pathname", url.pathname],
        ["Search", url.search],
        ["Hash", url.hash],
        ["Origin", url.origin],
        ["Normalized", url.href],
      ].filter(([, value]) => value) as [string, string][];
      params = Array.from(url.searchParams.entries());
    } catch {
      error = "URL tidak valid. Periksa alamat yang kamu masukkan.";
    }
  }
  let output = "";
  let codecError = "";
  try {
    output =
      mode === "encode"
        ? encodeURIComponent(state.urlCodecInput)
        : decodeURIComponent(state.urlCodecInput);
  } catch {
    codecError = "Teks URI tidak valid. Periksa urutan karakter persen (%).";
  }

  function switchMode(next: string | null) {
    if (!next || next === mode) return;
    setState({
      ...state,
      urlCodecMode: next,
      urlCodecInput: output && !codecError ? output : state.urlCodecInput,
    });
  }

  return (
    <ToolLayout
      id="url"
      storageAvailable={storageAvailable}
      onExample={() =>
        setState({
          urlInput: "https://example.com/docs?tool=json&mode=preview#input",
          urlCodecInput: "hello world?tool=json",
          urlCodecMode: "encode",
        })
      }
      onReset={() => setState(defaults)}
    >
      <ToolColumns>
        <ToolPanel title="URL & URI input">
          <TextField
            label="URL"
            fullWidth
            value={state.urlInput}
            onChange={(event) =>
              setState({ ...state, urlInput: event.target.value })
            }
            placeholder="https://example.com/path?key=value"
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <Stack spacing={2}>
            <Stack direction="row" useFlexGap sx={{ flexWrap: "wrap", gap: 1 }}>
              <ToggleButtonGroup
                value={mode}
                exclusive
                onChange={(_, value: string | null) => switchMode(value)}
                aria-label="Mode URI"
              >
                <ToggleButton value="encode">Encode</ToggleButton>
                <ToggleButton value="decode">Decode</ToggleButton>
              </ToggleButtonGroup>
              <Button
                startIcon={<ArrowLeftRight size={17} />}
                onClick={() =>
                  switchMode(mode === "encode" ? "decode" : "encode")
                }
              >
                Tukar
              </Button>
            </Stack>
            <Editor
              label="URI input"
              testId="url-codec-input"
              value={state.urlCodecInput}
              onChange={(value) => setState({ ...state, urlCodecInput: value })}
              placeholder="Teks untuk encode atau decode…"
            />
            {codecError && <Alert severity="error">{codecError}</Alert>}
          </Stack>
        </ToolPanel>
        <Stack spacing={2}>
          <ToolPanel
            title="Bagian URL"
            action={
              <CopyButton
                value={rows
                  .map(([key, value]) => `${key}: ${value}`)
                  .join("\n")}
                label="Salin detail"
              />
            }
          >
            {error ? (
              <Alert severity="error">{error}</Alert>
            ) : rows.length ? (
              <DetailList rows={rows} />
            ) : (
              <Typography variant="body2" color="text.secondary">
                Tempel URL untuk melihat komponennya.
              </Typography>
            )}
            <Typography component="h3" variant="h2">
              Query parameters
            </Typography>
            {params.length ? (
              params.map(([key, value], index) => (
                <DetailList key={`${key}-${index}`} rows={[[key, value]]} />
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                Tidak ada query parameter.
              </Typography>
            )}
          </ToolPanel>
          <ToolPanel
            title="URI hasil"
            action={<CopyButton value={output} label="Salin hasil URI" />}
          >
            <Editor
              label="URI output"
              testId="url-codec-output"
              readOnly
              value={output}
              placeholder="Hasil URI akan muncul di sini."
            />
          </ToolPanel>
        </Stack>
      </ToolColumns>
    </ToolLayout>
  );
}
