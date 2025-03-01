import { Paper, Stack, Typography, Box, LinearProgress } from "@mui/material";

import { ActionButtons } from "./components/ActionButtons";
import { Playlist } from "./components/Playlist";
import { useMusicPlayer } from "../../../context/useMusicPlayer"; // Removed MusicPlayerProvider import
import { useEffect, useState } from "react";
import AlbumCover from "./components/AlbumCover";

export const Radio = () => {
  const {
    currentTime,
    duration,
    isPlaying,
    setVolume,
    togglePlay,
    volume,
    bassLevel,
    musicInfo,
  } = useMusicPlayer(); // Use the context here without wrapping it in provider
  const [playlistVisible, setPlaylistVisible] = useState(false);
  const scale = 0.5 + (bassLevel / 255) * 1.2;

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
          <AlbumCover bassLevel={bassLevel} />
        </Stack>
        <Box>
          <Typography variant="h3" textAlign={"center"} gutterBottom>
            {musicInfo?.currentTrack?.title}
          </Typography>
          <Typography variant="h5" textAlign={"center"}>
            {musicInfo?.currentTrack?.artist}
          </Typography>
        </Box>

        <Stack spacing={1}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="body1">
              {new Date(currentTime * 1000).toISOString().substr(14, 5)}
            </Typography>
            <Typography variant="body1">
              {new Date(duration * 1000).toISOString().substr(14, 5)}
            </Typography>
          </Stack>
          <LinearProgress
            value={(currentTime * 100) / (duration || 1)}
            variant="determinate"
            color="secondary"
          />
        </Stack>
        <ActionButtons
          isPlaying={isPlaying}
          onVolumeChange={(_: Event, newValue: number | number[]) =>
            setVolume(newValue as number)
          }
          volume={volume}
          onListButtonClick={() => setPlaylistVisible(!playlistVisible)}
          onPlayButtonClick={togglePlay}
        />
      </Paper>
      {playlistVisible && <Playlist />}
    </Stack>
  );
};
