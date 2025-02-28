import { Tabs, Tab, Paper, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface TabbedInterfaceProps {
  tabs: string[]; // Tab titles
  contents: React.ReactNode[]; // Content for each tab
}

const TabbedInterface: React.FC<TabbedInterfaceProps> = ({
  tabs,
  contents,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the selected tab title from the URL (using query parameter)
  const queryParams = new URLSearchParams(location.search);
  const urlTabTitle = queryParams.get("tab");
  const initialTabTitle = urlTabTitle || tabs[0]; // Default to first tab if no tab is in the URL

  const [selectedTab, setSelectedTab] = useState<string>(initialTabTitle);

  // Update the URL when the tab changes
  const handleTabChange = (_event: React.ChangeEvent<{}>, newTab: string) => {
    setSelectedTab(newTab);
    // Update the query parameter in the URL with the tab title
    navigate(`?tab=${newTab}`, { replace: true });
  };

  useEffect(() => {
    // Update the state if the URL tab title changes
    if (urlTabTitle && urlTabTitle !== selectedTab) {
      setSelectedTab(urlTabTitle);
    }
  }, [location.search, urlTabTitle, selectedTab]);

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
        gap: 3,
        minHeight: "572px",
        minWidth: "960px",
      }}
    >
      <Tabs
        orientation="vertical"
        value={tabs.indexOf(selectedTab)} // Get the index of the selected tab
        selectionFollowsFocus
        indicatorColor="secondary"
        textColor="inherit"
        onChange={(_event, newIndex) => handleTabChange(_event, tabs[newIndex])}
        sx={{
          minWidth: 120,
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab}
            sx={{
              boxShadow:
                selectedTab === tab
                  ? (theme) => theme.custom.inset
                  : (theme) => theme.custom.default, // Inset when selected, regular box-shadow otherwise
              m: "5px",
              borderTopLeftRadius: "50px",
              borderBottomLeftRadius: "50px",
            }}
          />
        ))}
      </Tabs>

      <Stack flex={1}>{contents[tabs.indexOf(selectedTab)]}</Stack>
    </Paper>
  );
};

export default TabbedInterface;
