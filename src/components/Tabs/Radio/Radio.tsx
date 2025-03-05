import { Paper, Stack } from "@mui/material";
import { ActionButtons } from "./components/ActionButtons";
import { Playlist } from "./components/Playlist";
import { useState } from "react";
import AlbumCover from "./components/AlbumCover";
import { Progress } from "./components/Progress";
import { Title } from "./components/Title";

export const Radio = () => {
  const [playlistVisible, setPlaylistVisible] = useState<boolean>(true);

  return (
    <Stack
      direction="row"
      justifyContent={"space-between"}
      spacing={1}
      flex={1}
    >
      <Paper
        component={Stack}
        spacing={2}
        justifyContent={"space-between"}
        sx={{
          padding: 5,
          flex: 1,
          borderRadius: 3,
          boxShadow: (theme) => theme.custom.inset,
          overflow: "hidden",
        }}
      >
        <Stack
          alignItems={"center"}
          direction={"row"}
          justifyContent={"center"}
        >
          <AlbumCover />
        </Stack>
        <Title />
        {false && <Progress />}

        <ActionButtons
          playlistVisible={playlistVisible}
          onListButtonClick={() => setPlaylistVisible(!playlistVisible)}
        />
      </Paper>
      {playlistVisible && <Playlist />}
    </Stack>
  );
};
