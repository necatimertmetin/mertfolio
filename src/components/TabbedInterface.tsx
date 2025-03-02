import { Tabs, Tab, Paper, Stack } from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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

  // Extract the selected tab title from the URL (using query parameter)
  const queryParams = new URLSearchParams(location.search);
  const urlTabTitle = queryParams.get("tab");
  const initialTabTitle = urlTabTitle || tabs[0];

  const [selectedTab, setSelectedTab] = useState<string>(initialTabTitle);

  // Store mounted components to avoid re-renders
  const mountedContents = useMemo(() => {
    return contents.reduce<{ [key: string]: React.ReactNode }>(
      (acc, content, index) => {
        acc[tabs[index]] = content;
        return acc;
      },
      {}
    );
  }, [contents, tabs]);

  // Handle tab change
  const handleTabChange = (_event: React.ChangeEvent<{}>, newTab: string) => {
    setSelectedTab(newTab);
    navigate(`?tab=${newTab}`, { replace: true });
  };

  useEffect(() => {
    if (urlTabTitle && urlTabTitle !== selectedTab) {
      setSelectedTab(urlTabTitle);
    }
  }, [urlTabTitle, selectedTab]);

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
        value={tabs.indexOf(selectedTab)}
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
                  : (theme) => theme.custom.default,
              m: "5px",
              borderTopLeftRadius: "50px",
              borderBottomLeftRadius: "50px",
            }}
          />
        ))}
      </Tabs>

      <Stack flex={1}>{mountedContents[selectedTab]}</Stack>
    </Paper>
  );
};

export default TabbedInterface;
