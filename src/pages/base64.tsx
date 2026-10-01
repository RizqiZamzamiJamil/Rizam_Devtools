import {
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Alert,
  Stack,
} from "@mui/material";
import { ArrowLeftRight } from "lucide-react";
import ToolLayout from "@/layouts/ToolLayout";
import ToolPanel from "@/components/ToolPanel";
import Editor from "@/components/Editor";
import CopyButton from "@/components/CopyButton";
import ToolColumns from "@/components/ToolColumns";
import { useToolState } from "@/utils/useToolState";

export default function Base64Page() {
  const [state, setState, storageAvailable] = useToolState({
    base64Input: "",
    base64Mode: "encode",
  });
  const mode = state.base64Mode === "decode" ? "decode" : "encode";
  let output = "";
  let error = "";
  if (state.base64Input) {
    try {
      if (mode === "encode") {
        const bytes = new TextEncoder().encode(state.base64Input);
        let binary = "";
        for (let index = 0; index < bytes.length; index += 0x8000)
          binary += String.fromCharCode(...bytes.slice(index, index + 0x8000));
        output = btoa(binary);
      } else {
        const normalized = state.base64Input
          .trim()
          .replace(/-/g, "+")
          .replace(/_/g, "/");
        const padded = normalized.padEnd(
          normalized.length + ((4 - (normalized.length % 4)) % 4),
          "=",
        );
        const binary = atob(padded);
        output = new TextDecoder("utf-8", { fatal: true }).decode(
          Uint8Array.from(binary, (char) => char.charCodeAt(0)),
        );
      }
    } catch {
      error = "Input tidak valid. Periksa Base64 dan encoding UTF-8.";
    }
  }

  function switchMode(next: string | null) {
    if (!next || next === mode) return;
    setState({
      base64Mode: next,
      base64Input: output && !error ? output : state.base64Input,
    });
  }

  return (
    <ToolLayout
      id="base64"
      storageAvailable={storageAvailable}
      onExample={() =>
        setState({ base64Input: "Halo, developer! 👋", base64Mode: "encode" })
      }
      onReset={() => setState({ base64Input: "", base64Mode: "encode" })}
    >
      <Stack
        direction="row"
        useFlexGap
        sx={{ flexWrap: "wrap", gap: 1.5, mb: 1.5 }}
      >
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(_, value: string | null) => switchMode(value)}
          aria-label="Mode Base64"
        >
          <ToggleButton value="encode">Encode</ToggleButton>
          <ToggleButton value="decode">Decode</ToggleButton>
        </ToggleButtonGroup>
        <Button
          startIcon={<ArrowLeftRight size={17} />}
          onClick={() => switchMode(mode === "encode" ? "decode" : "encode")}
        >
          Tukar arah
        </Button>
      </Stack>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <ToolColumns>
        <ToolPanel title={mode === "encode" ? "Teks asli" : "Base64"}>
          <Editor
            label="Base64 input"
            testId="base64-input"
            value={state.base64Input}
            onChange={(value) => setState({ ...state, base64Input: value })}
            tall
            placeholder={
              mode === "encode" ? "Ketik atau tempel teks…" : "Tempel Base64…"
            }
          />
        </ToolPanel>
        <ToolPanel
          title={mode === "encode" ? "Base64" : "Teks hasil decode"}
          action={<CopyButton value={output} />}
        >
          <Editor
            label="Base64 output"
            testId="base64-output"
            readOnly
            value={output}
            tall
            placeholder="Hasil diperbarui saat kamu mengetik."
          />
        </ToolPanel>
      </ToolColumns>
    </ToolLayout>
  );
}
