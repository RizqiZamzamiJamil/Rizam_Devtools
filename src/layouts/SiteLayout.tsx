import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Typography,
  Tabs,
  Tab,
  TabScrollButton,
  type TabScrollButtonProps,
} from "@mui/material";
import { Menu, X, LockKeyhole } from "lucide-react";
import logo from "@/assets/logo-white.png";
import { tools } from "@/utils/tools";
import Navigation from "./Navigation";

function NavigationScrollButton(props: TabScrollButtonProps) {
  return (
    <TabScrollButton
      {...props}
      component="button"
      role="button"
      tabIndex={props.disabled ? -1 : 0}
      aria-hidden={props.disabled}
      aria-disabled={props.disabled}
      aria-label={
        props.direction === "left" ? "Alat sebelumnya" : "Alat berikutnya"
      }
    />
  );
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const path = router.asPath.split(/[?#]/)[0].replace(/\/$/, "");
  const active = tools.find(
    (tool) =>
      path === `/${tool.id}` ||
      path === `/tools/${tool.id}` ||
      (tool.id === "json" && path === ""),
  )?.id;

  useEffect(() => {
    // Load tool modules before a click, including tools inside the mobile drawer.
    if (process.env.NODE_ENV !== "production") return;
    void Promise.all(
      tools.map((tool) => router.prefetch(`/${tool.id}/`)),
    ).catch(() => {});
  }, [router]);

  return (
    <Box
      className="flex h-dvh min-h-0 flex-col overflow-hidden"
      sx={{
        "--header-height": { xs: "56px", sm: "104px", lg: "56px", xl: "64px" },
        "@media (max-width: 239px)": { "--header-height": "120px" },
      }}
    >
      <Box
        component="a"
        href="#main-content"
        sx={{
          position: "fixed",
          top: -80,
          left: 16,
          zIndex: 1500,
          p: 2,
          bgcolor: "background.paper",
          color: "secondary.main",
          "&:focus": { top: 8 },
        }}
      >
        Ke konten
      </Box>
      <Box
        component="header"
        className="shrink-0"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1100,
          bgcolor: "background.default",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Box
          sx={{
            height: { xs: 56, lg: 56, xl: 64 },
            px: { xs: 2, sm: 2, lg: 3, xl: 3 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            "@media (max-width: 239px)": {
              height: "auto",
              minHeight: 120,
              flexWrap: "wrap",
              gap: 1,
              py: 1,
            },
          }}
        >
          <Box
            component={Link}
            href="/"
            aria-label="DevTools, beranda"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1.5,
              color: "text.primary",
              textDecoration: "none",
              minHeight: 44,
            }}
          >
            <Image
              src={logo}
              alt="Logo DevTools"
              width={30}
              height={34}
              priority
              style={{ width: "30px", height: "34px", objectFit: "contain" }}
            />
            <Typography
              component="span"
              sx={{
                fontSize: { xs: "1.125rem", xl: "1.375rem" },
                fontWeight: 600,
                letterSpacing: "-0.04em",
              }}
            >
              DevTools
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Tools untuk penggunaan harian Developer.
          </Typography>
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              alignItems: "center",
              gap: 1,
              color: "text.secondary",
            }}
          >
            <LockKeyhole size={16} />
            <Typography variant="body2">Diproses langsung di browser</Typography>
          </Box>
          <Button
            startIcon={<Menu size={18} />}
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls={open ? "tool-menu" : undefined}
            sx={{ display: { xs: "inline-flex", sm: "none" }, px: 1.5 }}
          >
            Alat
          </Button>
        </Box>
        <Box sx={{ display: { xs: "none", sm: "block", lg: "none" }, px: 2 }}>
          <Tabs
            value={active || false}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="Alat developer"
            slots={{ scrollButtons: NavigationScrollButton }}
            sx={{ minHeight: 55 }}
          >
            {tools.map((tool) => (
              <Tab
                key={tool.id}
                value={tool.id}
                component={Link}
                href={`/${tool.id}/`}
                scroll={false}
                label={tool.label}
                sx={{
                  minWidth: 80,
                  minHeight: 48,
                  textTransform: "none",
                  "&.Mui-selected": { color: "secondary.main" },
                }}
              />
            ))}
          </Tabs>
        </Box>
      </Box>
      <Box
        className="grid min-h-0 flex-1"
        sx={{
          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            lg: "208px minmax(0, 1fr)",
            xl: "232px minmax(0, 1fr)",
          },
        }}
      >
        <Box
          component="aside"
          sx={{
            display: { xs: "none", lg: "block" },
            borderRight: 1,
            borderColor: "divider",
            minHeight: 0,
            overflowY: "auto",
            bgcolor: "background.default",
          }}
        >
          <Box
            sx={{
              minHeight: 0,
            }}
          >
            <Navigation active={active} />
            <Box
              sx={{
                mx: { lg: 3, xl: 4 },
                mb: 3,
                pt: 2,
                borderTop: 1,
                borderColor: "divider",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Input tersimpan otomatis di browser sebagai cache.
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          component="main"
          id="main-content"
          tabIndex={-1}
          className="flex min-h-0 min-w-0 flex-col overflow-hidden p-3 md:p-4 lg:p-5 xl:p-6"
        >
          <Box className="min-h-0 w-full flex-1">{children}</Box>
        </Box>
      </Box>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{ paper: { sx: { width: "min(320px, 90vw)" } } }}
      >
        <Box
          id="tool-menu"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Typography variant="h2">Pilih alat</Typography>
          <IconButton aria-label="Tutup menu" onClick={() => setOpen(false)}>
            <X size={20} />
          </IconButton>
        </Box>
        <Navigation active={active} onNavigate={() => setOpen(false)} />
      </Drawer>
    </Box>
  );
}
