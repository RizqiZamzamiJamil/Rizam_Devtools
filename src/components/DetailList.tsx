import { Box, Typography } from "@mui/material";

export default function DetailList({
  rows,
}: {
  rows: [string, string | number][];
}) {
  return (
    <Box component="dl" sx={{ m: 0 }}>
      {rows.map(([label, value]) => (
        <Box
          key={label}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "130px minmax(0, 1fr)",
              xl: "160px minmax(0, 1fr)",
            },
            gap: { xs: 0.5, sm: 2 },
            py: 1.5,
            borderBottom: 1,
            borderColor: "divider",
            "&:last-child": { borderBottom: 0 },
          }}
        >
          <Typography component="dt" variant="body2" color="text.secondary">
            {label}
          </Typography>
          <Typography
            component="dd"
            variant="body2"
            sx={{
              m: 0,
              overflowWrap: "anywhere",
              fontFamily: "var(--font-mono), monospace",
            }}
          >
            {value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
