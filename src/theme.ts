import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    custom: {
      inset: string;
      default: string;
    };
  }
  interface ThemeOptions {
    custom?: {
      inset?: string;
      default?: string;
    };
  }
}

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    secondary: {
      main: "#686868",
    },
    background: {
      default: "#E2E2E2",
      paper: "#E2E2E2",
    },
    text: {
      primary: "#686868",
    },
  },
  typography: {
    fontFamily: "'Raleway', sans-serif",
  },
  custom: {
    inset: "inset 2px 2px 3px #888888, inset -2px -2px 3px #ffffff",
    default: "2px 2px 3px #888888, -2px -2px 3px #ffffff",
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    secondary: {
      main: "#686868",
    },
    background: {
      default: "#1E1E1E",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#E2E2E2",
    },
  },
  typography: {
    fontFamily: "'Raleway', sans-serif",
  },
  custom: {
    inset: "inset 2px 2px 3px #1a1a1a, inset -2px -2px 3px #484848",
    default: "2px 2px 3px #1a1a1a, -2px -2px 3px #292929",
  },
});
