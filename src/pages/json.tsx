import { useState } from "react";
import { Button, Stack, Alert, TextField, MenuItem } from "@mui/material";
import { CheckCircle2, Braces } from "lucide-react";
import ToolLayout from "@/layouts/ToolLayout";
import ToolPanel from "@/components/ToolPanel";
import Editor from "@/components/Editor";
import CopyButton from "@/components/CopyButton";
import ToolColumns from "@/components/ToolColumns";
import { useToolState } from "@/utils/useToolState";

const example =
  '{\n  "project": "DevTools",\n  "tools": ["JSON", "JWT", "Base64"],\n  "settings": {\n    "theme": "dark",\n    "autosave": true\n  }\n}';
const defaults = { jsonInput: example, jsonOutput: "", jsonStatus: "Ready" };

export default function JsonPage() {
  const [state, setState, storageAvailable] = useToolState(defaults);
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  function process(action: "format" | "minify" | "validate") {
    try {
      const parsed: unknown = JSON.parse(state.jsonInput);
      const output =
        action === "validate"
          ? state.jsonOutput
          : JSON.stringify(
              parsed,
              null,
              action === "format" ? indent : undefined,
            );
      setState({ ...state, jsonOutput: output, jsonStatus: "Valid JSON" });
      setError("");
      setNotice(
        action === "validate"
          ? "JSON valid."
          : action === "format"
            ? "JSON sudah dirapikan."
            : "JSON sudah dipadatkan.",
      );
    } catch (cause) {
      const message =
        cause instanceof Error ? cause.message : "JSON tidak valid.";
      setError(message);
      setNotice("");
      setState({ ...state, jsonOutput: "", jsonStatus: message });
    }
  }

  function reset(input: string) {
    setState({ jsonInput: input, jsonOutput: "", jsonStatus: "Ready" });
    setError("");
    setNotice("");
  }

  return (
    <ToolLayout
      id="json"
      onExample={() => reset(example)}
      onReset={() => reset("")}
      storageAvailable={storageAvailable}
    >
      <Stack
        direction="row"
        useFlexGap
        sx={{
          flexWrap: "wrap",
          gap: 1,
          mb: 1.5,
          alignItems: "center",
          "@media (max-width: 320px)": {
            flexWrap: "nowrap",
            overflowX: "auto",
            py: 1,
            "& > *": { flexShrink: 0 },
          },
        }}
      >
        <Button
          variant="contained"
          startIcon={<Braces size={17} />}
          onClick={() => process("format")}
        >
          Format JSON
        </Button>
        <Button onClick={() => process("minify")}>Minify</Button>
        <Button
          startIcon={<CheckCircle2 size={17} />}
          onClick={() => process("validate")}
        >
          Validasi
        </Button>
        <TextField
          select
          label="Indentasi"
          value={indent}
          onChange={(event) => setIndent(Number(event.target.value))}
          size="small"
          sx={{ minWidth: 125, ml: { xs: 0, sm: "auto" } }}
        >
          <MenuItem value={2}>2 spasi</MenuItem>
          <MenuItem value={4}>4 spasi</MenuItem>
        </TextField>
      </Stack>
      {(error || notice) && (
        <Alert
          severity={error ? "error" : "success"}
          sx={{ mb: 2 }}
          role="status"
        >
          {error || notice}
        </Alert>
      )}
      <ToolColumns>
        <ToolPanel title="Input">
          <Editor
            label="JSON input"
            testId="json-input"
            tall
            value={state.jsonInput}
            onChange={(value) => {
              setState({
                ...state,
                jsonInput: value,
                jsonOutput: "",
                jsonStatus: "Ready",
              });
              setError("");
              setNotice("");
            }}
            placeholder='{"key": "value"}'
          />
        </ToolPanel>
        <ToolPanel
          title="Output"
          action={<CopyButton value={state.jsonOutput} />}
        >
          <Editor
            label="JSON output"
            testId="json-output"
            tall
            readOnly
            value={state.jsonOutput}
            placeholder="Hasil format atau minify akan muncul di sini."
          />
        </ToolPanel>
      </ToolColumns>
    </ToolLayout>
  );
}
