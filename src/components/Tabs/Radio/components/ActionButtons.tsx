import { PlayArrow, Pause, QueueMusic } from "@mui/icons-material";
import { Stack, Button, Slider } from "@mui/material";

type ActionButtonsProps = {
  playlistVisible?: boolean;
  onListButtonClick: () => void;
  isPlaying: boolean;
  onPlayButtonClick: () => void;
  volume: number; // Volume prop
  onVolumeChange: (event: Event, newValue: number | number[]) => void;
};

export const ActionButtons = ({
  playlistVisible = false,
  onListButtonClick,
  isPlaying,
  onPlayButtonClick,
  volume,
  onVolumeChange,
}: ActionButtonsProps) => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      spacing={5}
    >
      <Button
        onClick={onPlayButtonClick}
        disableRipple
        color="secondary"
        sx={{
          aspectRatio: 1,
          borderRadius: "100%",
          boxShadow: isPlaying
            ? (theme) => theme.custom.inset
            : (theme) => theme.custom.default,
        }}
      >
        {isPlaying ? (
          <Pause fontSize="large" color="action" />
        ) : (
          <PlayArrow fontSize="large" color="action" />
        )}
      </Button>
      <Slider
        value={volume}
        onChange={onVolumeChange}
        min={0}
        max={1}
        step={0.01}
        color="secondary"
      />
      <Button
        onClick={onListButtonClick}
        disableRipple
        color="secondary"
        sx={{
          aspectRatio: 1,
          borderRadius: "100%",
          boxShadow: playlistVisible
            ? (theme) => theme.custom.inset
            : (theme) => theme.custom.default,
        }}
      >
        <QueueMusic fontSize="large" color="action" />
      </Button>
    </Stack>
  );
};
