import { Paper, Stack, Typography, Box, LinearProgress } from "@mui/material";

import { ActionButtons } from "./components/ActionButtons";
import { Playlist } from "./components/Playlist";
import { useMusicPlayer } from "../../../context/useMusicPlayer"; // Removed MusicPlayerProvider import
import { useState } from "react";
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
          justifyContent={"space-between"}
        >
          <Box
            padding={1}
            sx={{
              borderRadius: "100%",
              boxShadow: (theme) => theme.custom.default,
              background:
                "radial-gradient(circle, rgba(242,242,242,1) 50%, rgba(203,203,203,1) 100%)",
              overflow: "hidden",
            }}
          >
            <Box
              padding={4}
              sx={{
                borderRadius: "100%",

                background:
                  "linear-gradient( rgba(203,203,203,1) 0%, rgba(242,242,242,1) 100%)",
                boxShadow: (theme) => theme.custom.inset,
              }}
            >
              <Box
                height={"64px"}
                width={"64px"}
                sx={{
                  borderRadius: "100%",
                  transform: `scale(${Math.min(Math.max(scale, 0.5), 2)})`,
                  background: "linear-gradient(145deg, #f2f2f2, #cbcbcb)",
                  boxShadow: (theme) => theme.custom.default,
                }}
              ></Box>
            </Box>
          </Box>
          <AlbumCover bassLevel={bassLevel} />
          <Box
            padding={1}
            sx={{
              borderRadius: "100%",
              boxShadow: (theme) => theme.custom.default,
              background:
                "radial-gradient(circle, rgba(242,242,242,1) 50%, rgba(203,203,203,1) 100%)",
              overflow: "hidden",
            }}
          >
            <Box
              padding={4}
              sx={{
                borderRadius: "100%",

                background:
                  "linear-gradient( rgba(203,203,203,1) 0%, rgba(242,242,242,1) 100%)",
                boxShadow: (theme) => theme.custom.inset,
              }}
            >
              <Box
                height={"64px"}
                width={"64px"}
                sx={{
                  borderRadius: "100%",
                  transform: `scale(${Math.min(Math.max(scale, 0.5), 2)})`,
                  background: "linear-gradient(145deg, #f2f2f2, #cbcbcb)",
                  boxShadow: (theme) => theme.custom.default,
                }}
              ></Box>
            </Box>
          </Box>
        </Stack>
        <Box>
          <Typography variant="h4" textAlign={"center"}>
            "test"
          </Typography>
          <Typography variant="h5" textAlign={"center"}>
            "test"
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
