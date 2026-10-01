import { useRef, useState } from "react";
import { md5 } from "js-md5";
import {
  Button,
  TextField,
  MenuItem,
  Alert,
  Stack,
  Typography,
} from "@mui/material";
import { Hash } from "lucide-react";
import ToolLayout from "@/layouts/ToolLayout";
import ToolPanel from "@/components/ToolPanel";
import Editor from "@/components/Editor";
import CopyButton from "@/components/CopyButton";
import ToolColumns from "@/components/ToolColumns";
import { useToolState } from "@/utils/useToolState";

const algorithms = ["MD5", "SHA-1", "SHA-256", "SHA-384", "SHA-512"] as const;
const defaults = { hashInput: "", hashAlgorithm: "SHA-256", hashOutput: "" };

export default function HashPage() {
  const [state, setState, storageAvailable] = useToolState(defaults);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const request = useRef(0);
  const algorithm =
    algorithms.find((item) => item === state.hashAlgorithm) || "SHA-256";

  async function generate() {
    const version = ++request.current;
    setBusy(true);
    setError("");
    try {
      let digest: string;
      if (algorithm === "MD5") digest = md5(state.hashInput);
      else {
        const bytes = await crypto.subtle.digest(
          algorithm,
          new TextEncoder().encode(state.hashInput),
        );
        digest = Array.from(new Uint8Array(bytes), (byte) =>
          byte.toString(16).padStart(2, "0"),
        ).join("");
      }
      if (request.current === version)
        setState({ ...state, hashOutput: digest });
    } catch {
      if (request.current === version)
        setError(
          "Hash gagal dibuat. Browser ini harus mendukung Web Crypto dalam konteks HTTPS atau localhost.",
        );
    } finally {
      if (request.current === version) setBusy(false);
    }
  }

  function change(next: typeof defaults) {
    request.current++;
    setBusy(false);
    setError("");
    setState(next);
  }

  return (
    <ToolLayout
      id="hash"
      storageAvailable={storageAvailable}
      onExample={() => change({ ...defaults, hashInput: "Hello, DevTools!" })}
      onReset={() => change(defaults)}
    >
      <ToolColumns>
        <ToolPanel title="Teks asal">
          <Editor
            label="Hash input"
            testId="hash-input"
            value={state.hashInput}
            onChange={(value) =>
              change({ ...state, hashInput: value, hashOutput: "" })
            }
            compact
            placeholder="Masukkan teks yang akan di-hash…"
          />
          <Stack spacing={2}>
            <TextField
              select
              label="Algoritma"
              value={algorithm}
              onChange={(event) =>
                change({
                  ...state,
                  hashAlgorithm: event.target.value,
                  hashOutput: "",
                })
              }
            >
              {algorithms.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
            <Button
              variant="contained"
              startIcon={<Hash size={17} />}
              onClick={generate}
              disabled={busy}
            >
              {busy ? "Menghitung…" : "Buat hash"}
            </Button>
            {error && <Alert severity="error">{error}</Alert>}
          </Stack>
        </ToolPanel>
        <ToolPanel
          title="Digest"
          action={<CopyButton value={state.hashOutput} />}
        >
          <Editor
            label="Hash output"
            testId="hash-output"
            readOnly
            compact
            value={state.hashOutput}
            placeholder="Hasil digest dalam format heksadesimal."
          />
          <Typography variant="body2" color="text.secondary">
            Teks kosong juga memiliki digest.
          </Typography>
          {(algorithm === "MD5" || algorithm === "SHA-1") && (
            <Alert severity="warning">
              {algorithm} tersedia untuk kompatibilitas. Hindari untuk kebutuhan
              keamanan baru.
            </Alert>
          )}
        </ToolPanel>
      </ToolColumns>
    </ToolLayout>
  );
}
