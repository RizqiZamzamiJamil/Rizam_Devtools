import { TextField, Box, Typography } from "@mui/material";
import type { KeyboardEvent } from "react";

export default function Editor({
  label,
  value,
  onChange,
  readOnly = false,
  placeholder,
  tall = false,
  compact = false,
  testId,
}: {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  placeholder?: string;
  tall?: boolean;
  compact?: boolean;
  testId?: string;
}) {
  function indent(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab" || readOnly || event.shiftKey || !onChange) return;
    const input = event.target as HTMLTextAreaElement;
    event.preventDefault();
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const scroll = input.scrollTop;
    onChange(value.slice(0, start) + "  " + value.slice(end));
    requestAnimationFrame(() => {
      input.setSelectionRange(start + 2, start + 2);
      input.scrollTop = scroll;
    });
  }

  return (
    <Box
      className="flex min-w-0 flex-col"
      sx={{ flexShrink: 1, minHeight: 88 }}
    >
      <TextField
        label={label}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        onKeyDown={indent}
        multiline
        rows={1}
        fullWidth
        placeholder={placeholder}
        slotProps={{
          inputLabel: { shrink: true },
          input: { readOnly },
          htmlInput: {
            "data-testid": testId,
            spellCheck: false,
            "aria-label": label,
          },
        }}
        sx={{
          minHeight: 64,
          flexShrink: 1,
          "& .MuiInputBase-root": { p: 1.5, minHeight: 0, height: "100%" },
          height: tall
            ? "clamp(80px, 32dvh, 320px)"
            : compact
              ? "88px"
              : "128px",
          maxHeight: "100%",
          "& textarea": {
            fontFamily: "var(--font-mono), monospace",
            fontSize: { xs: "0.875rem", xl: "0.9375rem" },
            lineHeight: 1.65,
            height: "100% !important",
            overflowY: "auto !important",
            overflowWrap: "anywhere",
          },
        }}
      />
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 0.75, fontSize: "0.75rem", flexShrink: 0 }}
      >
        {value.length.toLocaleString("id-ID")} karakter
        {readOnly ? " · Hasil" : " · Shift + Tab untuk pindah fokus"}
      </Typography>
    </Box>
  );
}
