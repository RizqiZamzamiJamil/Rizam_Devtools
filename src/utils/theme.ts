import { createTheme } from "@mui/material/styles";

export const colors = {
  orange: "#f54f00",
  orangeText: "#ff985d",
  background: "#101010",
  surface: "#191919",
  inset: "#131313",
  border: "#343434",
  controlBorder: "#777777",
  text: "#f5f3f0",
  muted: "#b2ada7",
};

export const theme = createTheme({
  cssVariables: true,
  breakpoints: { values: { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1536 } },
  palette: {
    mode: "dark",
    primary: {
      main: colors.orange,
      light: colors.orangeText,
      contrastText: "#101010",
    },
    secondary: { main: colors.orangeText },
    background: { default: colors.background, paper: colors.surface },
    text: { primary: colors.text, secondary: colors.muted },
    divider: colors.border,
    success: { main: "#81c995" },
    error: { main: "#ff9a92" },
    warning: { main: "#efbd73" },
    info: { main: "#c9b7a8" },
  },
  typography: {
    fontFamily: "var(--font-poppins), sans-serif",
    fontSize: 14,
    h1: {
      fontSize: "1.65rem",
      fontWeight: 600,
      letterSpacing: "-0.04em",
      lineHeight: 1.25,
    },
    h2: { fontSize: "1rem", fontWeight: 500, letterSpacing: "-0.02em" },
    button: { textTransform: "none", fontWeight: 500 },
    body2: { fontSize: "0.875rem", lineHeight: 1.7 },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true } },
    MuiButton: {
      defaultProps: { disableElevation: true, variant: "outlined" },
      styleOverrides: {
        root: {
          minHeight: 44,
          padding: "8px 16px",
          borderRadius: 6,
          maxWidth: "100%",
        },
        outlined: { borderColor: colors.controlBorder, color: colors.text },
        text: { color: colors.muted },
        contained: { "&:hover": { backgroundColor: "#ff6a24" } },
      },
    },
    MuiIconButton: { styleOverrides: { root: { width: 44, height: 44 } } },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: { root: { backgroundImage: "none" } },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          backgroundColor: colors.inset,
          fontSize: "0.875rem",
          minHeight: 44,
        },
        notchedOutline: { borderColor: colors.controlBorder },
      },
    },
    MuiInputLabel: { styleOverrides: { root: { color: colors.muted } } },
    MuiInputBase: {
      styleOverrides: {
        input: { "&::placeholder": { color: colors.muted, opacity: 1 } },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          minHeight: 44,
          textTransform: "none",
          borderColor: colors.controlBorder,
          "&.Mui-selected": {
            color: colors.orangeText,
            backgroundColor: "#352317",
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: { root: { borderRadius: 6, overflowWrap: "anywhere" } },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: { minWidth: 0, maxWidth: "100%", flexWrap: "wrap" },
      },
    },
    MuiSnackbar: {
      styleOverrides: { root: { maxWidth: "calc(100% - 32px)" } },
    },
    MuiMenuItem: { styleOverrides: { root: { minHeight: 44 } } },
    MuiTabs: { styleOverrides: { scrollButtons: { width: 44 } } },
    MuiCssBaseline: {
      styleOverrides: {
        ":root": { colorScheme: "dark" },
        "*": { boxSizing: "border-box" },
        body: { margin: 0 },
        "a, button, input, textarea, [role='button']": {
          "&:focus-visible": { outline: "2px solid #ff985d", outlineOffset: 4 },
        },
        "::selection": { backgroundColor: "#75401e", color: colors.text },
        "@media (prefers-reduced-motion: reduce)": {
          "*, *::before, *::after": {
            animationDuration: "0.01ms !important",
            transitionDuration: "0.01ms !important",
            scrollBehavior: "auto !important",
          },
        },
      },
    },
  },
});
