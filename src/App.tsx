import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Typography,
} from "@mui/material";
import TabbedInterface from "./components/TabbedInterface";
import { Home } from "./components/Tabs/Home/Home";
import { Radio } from "./components/Tabs/Radio/Radio";
import { MusicPlayerProvider } from "./context/useMusicPlayer";

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

const lightTheme = createTheme({
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
    default: " 2px 2px 3px #888888,  -2px -2px 3px #ffffff",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    secondary: {
      main: "#686868",
    },
    background: {
      default: "#121212",
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
    default: " 2px 2px 3px #1a1a1a,  -2px -2px 3px #292929",
  },
});

// Explicitly define the context type
interface ThemeContextType {
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useThemeMode() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within a ThemeProvider");
  }
  return context;
}

function App() {
  const storedThemeMode = localStorage.getItem("isDarkMode");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    storedThemeMode ? JSON.parse(storedThemeMode) : false
  );

  useEffect(() => {
    // Save the theme mode to localStorage whenever it changes
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TabbedInterface
          tabs={["home", "about me", "portfolio", "radio"]}
          contents={[
            <Home />,
            <Typography variant="h4">About Me Section</Typography>,
            <Typography variant="h1" letterSpacing={5} fontWeight={200}>
              Portfolio
            </Typography>,
            <MusicPlayerProvider>
              <Radio />
            </MusicPlayerProvider>,
          ]}
        />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
