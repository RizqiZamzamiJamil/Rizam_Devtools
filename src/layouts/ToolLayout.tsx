import Head from "next/head";
import {
  Box,
  Typography,
  Button,
  Stack,
  Alert,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { RotateCcw, FileText, MoreHorizontal } from "lucide-react";
import { useState, type ReactNode } from "react";
import { tools, type ToolId } from "@/utils/tools";

export default function ToolLayout({
  id,
  onExample,
  onReset,
  storageAvailable = true,
  children,
}: {
  id: ToolId;
  onExample: () => void;
  onReset: () => void;
  storageAvailable?: boolean;
  children: ReactNode;
}) {
  const tool = tools.find((item) => item.id === id)!;
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <Head>
        <title>{`${tool.title} | DevTools`}</title>
        <meta name="description" content={tool.description} />
      </Head>
      <Box className="shrink-0">
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Box sx={{ minWidth: 0, "@media (max-width: 320px)": { flex: 1 } }}>
            <Typography
              component="h1"
              variant="h1"
              sx={{
                fontSize: {
                  xs: "1.25rem",
                  sm: "1.5rem",
                  lg: "1.65rem",
                  xl: "1.875rem",
                },
              }}
            >
              {tool.title}
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
              sx={{ mt: 0.5, display: { xs: "none", md: "block" } }}
            >
              {tool.description}
            </Typography>
          </Box>
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{
              flexWrap: "wrap",
              "@media (max-width: 320px)": { display: "none" },
            }}
          >
            <Button startIcon={<FileText size={16} />} onClick={onExample}>
              Muat contoh
            </Button>
            <Button startIcon={<RotateCcw size={16} />} onClick={onReset}>
              Reset
            </Button>
          </Stack>
          <IconButton
            aria-label="Opsi alat"
            aria-haspopup="menu"
            aria-expanded={Boolean(menuAnchor)}
            onClick={(event) => setMenuAnchor(event.currentTarget)}
            sx={{
              display: "none",
              "@media (max-width: 320px)": { display: "inline-flex" },
            }}
          >
            <MoreHorizontal size={20} />
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={() => setMenuAnchor(null)}
          >
            <MenuItem
              onClick={() => {
                onExample();
                setMenuAnchor(null);
              }}
            >
              Muat contoh
            </MenuItem>
            <MenuItem
              onClick={() => {
                onReset();
                setMenuAnchor(null);
              }}
            >
              Reset
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      {!storageAvailable && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Penyimpanan browser tidak tersedia. Perubahan tetap bisa dipakai
          selama halaman ini terbuka.
        </Alert>
      )}
      <div className="tool-body flex min-h-0 flex-1 flex-col [&>div:not([data-workspace])]:shrink-0 [&>p]:shrink-0">
        {children}
      </div>
    </div>
  );
}
