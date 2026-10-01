import Link from "next/link";
import { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Search } from "lucide-react";
import { tools, type ToolId } from "@/utils/tools";

export default function Navigation({
  active,
  onNavigate,
}: {
  active?: ToolId;
  onNavigate?: () => void;
}) {
  const [query, setQuery] = useState("");
  const filtered = tools.filter((tool) =>
    `${tool.label} ${tool.title}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <Box component="nav" aria-label="Alat developer" sx={{ p: 2 }}>
      <TextField
        label="Cari alat"
        size="small"
        fullWidth
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search size={17} />
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 3 }}
      />
      {["Data", "Generator", "Web & teks"].map((group) => {
        const items = filtered.filter((tool) => tool.group === group);
        return (
          items.length > 0 && (
            <Box key={group} sx={{ mb: 2 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ px: 1.5, mb: 1, fontSize: "0.75rem" }}
              >
                {group}
              </Typography>
              <List disablePadding>
                {items.map((tool) => (
                  <ListItemButton
                    key={tool.id}
                    component={Link}
                    href={`/${tool.id}/`}
                    scroll={false}
                    onClick={onNavigate}
                    selected={active === tool.id}
                    aria-current={active === tool.id ? "page" : undefined}
                    sx={{
                      minHeight: 48,
                      borderRadius: 1,
                      mb: 0.5,
                      borderLeft: "3px solid transparent",
                      "&.Mui-selected": {
                        borderLeftColor: "primary.main",
                        backgroundColor: "#2c211a",
                        color: "secondary.main",
                        "&:hover": { backgroundColor: "#35271d" },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 34,
                        color:
                          active === tool.id
                            ? "secondary.main"
                            : "text.secondary",
                      }}
                    >
                      <tool.icon size={18} />
                    </ListItemIcon>
                    <ListItemText
                      primary={tool.label}
                      slotProps={{
                        primary: {
                          sx: {
                            fontSize: "0.875rem",
                            fontWeight: active === tool.id ? 600 : 400,
                          },
                        },
                      }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Box>
          )
        );
      })}
      {!filtered.length && (
        <Typography variant="body2" color="text.secondary">
          Tidak ada alat untuk “{query}”.
        </Typography>
      )}
    </Box>
  );
}
