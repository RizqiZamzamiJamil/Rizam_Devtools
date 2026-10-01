import { Box, Typography } from "@mui/material";
import ToolLayout from "@/layouts/ToolLayout";
import ToolPanel from "@/components/ToolPanel";
import Editor from "@/components/Editor";
import CopyButton from "@/components/CopyButton";
import ToolColumns from "@/components/ToolColumns";
import { useToolState } from "@/utils/useToolState";

function capitalize(word: string) {
  return word ? word.charAt(0).toUpperCase() + word.slice(1) : "";
}

export default function CasePage() {
  const [state, setState, storageAvailable] = useToolState({ caseInput: "" });
  const words = (
    state.caseInput
      .replace(/([a-z\d])([A-Z])/g, "$1 $2")
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
      .replace(/['"]/g, "")
      .match(/[\p{L}\p{N}]+/gu) || []
  ).map((word) => word.toLowerCase());
  const [first = "", ...rest] = words;
  const results = [
    ["camelCase", first + rest.map(capitalize).join("")],
    ["PascalCase", words.map(capitalize).join("")],
    ["snake_case", words.join("_")],
    ["kebab-case", words.join("-")],
    ["CONSTANT_CASE", words.join("_").toUpperCase()],
    ["dot.case", words.join(".")],
    ["path/case", words.join("/")],
    ["Title Case", words.map(capitalize).join(" ")],
    ["Sentence case", capitalize(words.join(" "))],
    ["lowercase", state.caseInput.toLowerCase()],
    ["UPPERCASE", state.caseInput.toUpperCase()],
  ];

  return (
    <ToolLayout
      id="case"
      storageAvailable={storageAvailable}
      onExample={() => setState({ caseInput: "hello developer tools" })}
      onReset={() => setState({ caseInput: "" })}
    >
      <ToolColumns>
        <ToolPanel title="Teks asal">
          <Editor
            label="Case input"
            testId="case-input"
            value={state.caseInput}
            onChange={(value) => setState({ caseInput: value })}
            placeholder="Teks, nama variabel, atau judul…"
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Spasi, pemisah, dan camelCase dibaca sebagai kata terpisah.
          </Typography>
        </ToolPanel>
        <ToolPanel
          title="Variasi penulisan"
          action={
            <CopyButton
              label="Salin semua"
              value={
                state.caseInput
                  ? results
                      .map(([label, value]) => `${label}: ${value}`)
                      .join("\n")
                  : ""
              }
            />
          }
        >
          {state.caseInput ? (
            results.map(([label, value]) => (
              <Box
                key={label}
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 1.5,
                  borderBottom: 1,
                  borderColor: "divider",
                  "&:last-child": { borderBottom: 0 },
                }}
              >
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 0.5 }}
                  >
                    {label}
                  </Typography>
                  <Typography
                    component="code"
                    sx={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "0.875rem",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {value}
                  </Typography>
                </Box>
                <CopyButton value={value} ariaLabel={`Salin ${label}`} />
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ py: 4 }}>
              Masukkan teks untuk melihat semua variasi.
            </Typography>
          )}
        </ToolPanel>
      </ToolColumns>
    </ToolLayout>
  );
}
