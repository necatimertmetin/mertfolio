import { Box, Typography } from "@mui/material";
import { useMemo } from "react";
import { useMusicPlayer } from "../../../../context/useMusicPlayer";

export const Title = () => {
  const { musicInfo } = useMusicPlayer();

  const memoizedMusicInfo = useMemo(() => musicInfo, [musicInfo]);
  return (
    <Box>
      <Typography variant="h4" textAlign={"center"} gutterBottom>
        {memoizedMusicInfo?.currentTrack?.title}
      </Typography>
      <Typography variant="h5" textAlign={"center"} color="secondary">
        {memoizedMusicInfo?.currentTrack?.artist}
      </Typography>
    </Box>
  );
};
