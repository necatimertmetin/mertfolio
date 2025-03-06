import { Tabs, Tab, Paper, Stack, Box } from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AlbumCover from "./Tabs/Radio/components/AlbumCover";
import { useMusicPlayer } from "../context/useMusicPlayer";

interface TabbedInterfaceProps {
  tabs: string[];
  contents: React.ReactNode[];
}

const TabbedInterface: React.FC<TabbedInterfaceProps> = ({
  tabs,
  contents,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isPlaying, streamAvailable } = useMusicPlayer();
  const queryParams = new URLSearchParams(location.search);
  const urlTabTitle = queryParams.get("tab");

  // Conditionally filter out the "radio" tab if stream is not available
  const filteredTabs = streamAvailable
    ? tabs
    : tabs.filter((tab) => tab !== "radio");

  const initialTab = filteredTabs.includes(urlTabTitle || "")
    ? urlTabTitle!
    : filteredTabs[0];

  const [selectedTab, setSelectedTab] = useState<string>(initialTab);

  const mountedContents = useMemo(() => {
    return contents.reduce<{ [key: string]: React.ReactNode }>(
      (acc, content, index) => {
        acc[filteredTabs[index]] = content;
        return acc;
      },
      {}
    );
  }, [contents, filteredTabs]);

  useEffect(() => {
    if (
      urlTabTitle &&
      urlTabTitle !== selectedTab &&
      filteredTabs.includes(urlTabTitle)
    ) {
      setSelectedTab(urlTabTitle);
    }
  }, [urlTabTitle, filteredTabs]);

  const handleTabChange = (_event: React.SyntheticEvent, newIndex: number) => {
    const newTab = filteredTabs[newIndex];
    if (newTab !== selectedTab) {
      setSelectedTab(newTab);
      navigate(`?tab=${newTab}`, { replace: true });
    }
  };

  return (
    <Paper
      elevation={5}
      component={Stack}
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: 3,
        borderRadius: 4,
        flexDirection: "row",
        alignItems: "stretch",
        gap: 3,
        minHeight: "572px",
        minWidth: "960px",
      }}
    >
      <Tabs
        orientation="vertical"
        value={filteredTabs.indexOf(selectedTab)}
        indicatorColor="secondary"
        textColor="inherit"
        onChange={handleTabChange}
        sx={{ minWidth: 120 }}
      >
        {filteredTabs.map((tab, index) => (
          <Tab
            key={index}
            label={
              tab === "radio" ? (
                <Stack direction="row" alignItems="center" spacing={1} flex={1}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "red",
                      animation: "pulse 1.5s infinite",
                      "@keyframes pulse": {
                        "0%": { transform: "scale(1)", opacity: 1 },
                        "50%": { transform: "scale(1.5)", opacity: 0.6 },
                        "100%": { transform: "scale(1)", opacity: 1 },
                      },
                    }}
                  />
                  <span>{tab}</span>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "red",
                      visibility: "hidden",
                      animation: "pulse 3s infinite",
                      "@keyframes pulse": {
                        "0%": { transform: "scale(1)", opacity: 1 },
                        "50%": { transform: "scale(1.5)", opacity: 0.5 },
                        "100%": { transform: "scale(1)", opacity: 1 },
                      },
                    }}
                  />
                </Stack>
              ) : (
                tab
              )
            }
            sx={{
              boxShadow:
                selectedTab === tab
                  ? (theme) => theme.custom.inset
                  : (theme) => theme.custom.default,
              m: "5px",
              borderTopLeftRadius: "50px",
              borderBottomLeftRadius: "50px",
            }}
          />
        ))}
        {selectedTab !== "radio" && isPlaying && (
          <Box
            sx={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translate(-50%, -150%)",
              cursor: "pointer",
            }}
            onClick={() => {
              setSelectedTab("radio");
              navigate("?tab=radio", { replace: true });
            }}
          >
            <AlbumCover size="small" />
          </Box>
        )}
      </Tabs>

      <Stack flex={1}>{mountedContents[selectedTab]}</Stack>
    </Paper>
  );
};
export default TabbedInterface;
