import { Button, Stack, Typography } from "@mui/material";

import { AvatarCard } from "./components/AvatarCard";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useThemeMode } from "../../../App";

export const Home = () => {
  const { isDarkMode, setIsDarkMode } = useThemeMode();

  return (
    <Stack direction={"row"} spacing={3} flex={1}>
      <AvatarCard />

      <Stack alignItems={"flex-end"}>
        <Typography variant="h1" letterSpacing={5} fontWeight={200}>
          Welcome
        </Typography>
        <Typography variant="h2" letterSpacing={5} fontWeight={200}>
          To
        </Typography>
        <Typography variant="h2" letterSpacing={5} fontWeight={200}>
          My Page
        </Typography>
        <Stack direction={"row"} alignItems={"center"} mt={"auto"} spacing={1}>
          <Typography
            variant="h6"
            textAlign={"right"}
            letterSpacing={5}
            fontWeight={200}
            flex={1}
          >
            {isDarkMode
              ? "Shape your ideas in the depths of the night."
              : " Illuminate your projects with the light of your design."}
          </Typography>
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            sx={{
              boxShadow: isDarkMode
                ? (theme) => theme.custom.inset
                : (theme) => theme.custom.default,
              background: isDarkMode ? "#323232" : "#E2E2E2",
              marginTop: "auto",
              transition: ".5s ease",
            }}
            height={"96px"}
            width={"96px"}
            borderRadius={"20px"}
            component={Button}
            onClick={() => setIsDarkMode(!isDarkMode)}
            disableRipple
          >
            {isDarkMode ? (
              <DarkMode color="action" fontSize="large" />
            ) : (
              <LightMode color="action" fontSize="large" />
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
