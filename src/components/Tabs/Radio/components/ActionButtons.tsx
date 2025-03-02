import { PlayArrow, Pause, QueueMusic } from "@mui/icons-material";
import { Stack, Button, Slider } from "@mui/material";
import { useMusicPlayer } from "../../../../context/useMusicPlayer";

type ActionButtonsProps = {
  playlistVisible?: boolean;
  onListButtonClick: () => void;
};

export const ActionButtons = ({
  playlistVisible = false,
  onListButtonClick,
}: ActionButtonsProps) => {
  const { isPlaying, setVolume, togglePlay, volume } = useMusicPlayer();
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      spacing={5}
    >
      <Button
        onClick={togglePlay}
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
        onChange={(_: Event, newValue: number | number[]) =>
          setVolume(newValue as number)
        }
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
