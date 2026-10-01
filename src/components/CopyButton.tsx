import { useState } from "react";
import { Button, Snackbar, Alert, Box } from "@mui/material";
import { Copy, Check } from "lucide-react";

export default function CopyButton({
  value,
  label = "Salin",
  ariaLabel,
}: {
  value: string;
  label?: string;
  ariaLabel?: string;
}) {
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setMessage("Tersalin ke clipboard.");
    } catch {
      setCopied(false);
      setMessage(
        "Clipboard tidak tersedia. Pilih dan salin teks secara manual.",
      );
    }
  }

  return (
    <>
      <Button
        onClick={copy}
        aria-label={ariaLabel}
        disabled={!value}
        startIcon={copied ? <Check size={16} /> : <Copy size={16} />}
        sx={{ flexShrink: 0 }}
      >
        <Box component="span" sx={{ minWidth: 0, overflowWrap: "anywhere" }}>
          {label}
        </Box>
      </Button>
      <Snackbar
        open={!!message}
        autoHideDuration={2400}
        onClose={() => {
          setMessage("");
          setCopied(false);
        }}
      >
        <Alert
          severity={copied ? "success" : "error"}
          onClose={() => {
            setMessage("");
            setCopied(false);
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
