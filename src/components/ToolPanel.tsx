import { Paper, Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

export default function ToolPanel({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Paper
      variant="outlined"
      className="tool-panel flex min-h-0 min-w-0 max-h-full flex-col shrink-0"
    >
      <Box
        sx={{
          px: 2,
          py: 1,
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1,
          minHeight: 64,
          flexShrink: 0,
        }}
      >
        <Typography component="h2" variant="h2">
          {title}
        </Typography>
        {action}
      </Box>
      <Box
        className="flex min-h-0 min-w-0 flex-col gap-3 p-4"
        sx={{
          "& > *": { minWidth: 0 },
          "@media (max-height: 650px)": { overflowY: "auto" },
        }}
      >
        {children}
      </Box>
    </Paper>
  );
}
