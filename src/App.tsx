import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import TabbedInterface from "./components/TabbedInterface";
import { Home } from "./components/Tabs/Home/Home";
import { Radio } from "./components/Tabs/Radio/Radio";
import { MusicPlayerProvider } from "./context/useMusicPlayer";
import { darkTheme, lightTheme } from "./theme";

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
        <MusicPlayerProvider>
          <TabbedInterface
            tabs={["home", "radio"]}
            contents={[<Home />, <Radio />]}
          />
        </MusicPlayerProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
