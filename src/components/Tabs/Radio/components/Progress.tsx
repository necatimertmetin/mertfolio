import { Stack, Typography, LinearProgress } from "@mui/material";
import { useMusicPlayer } from "../../../../context/useMusicPlayer";

export const Progress = () => {
  const { currentTime, duration } = useMusicPlayer();
  return (
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
  );
};
