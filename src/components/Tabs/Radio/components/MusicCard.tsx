import { Pause, PlayArrow } from "@mui/icons-material";
import { Box, Paper, Stack, Typography } from "@mui/material";

type MusicCardProps = {
  nowPlaying?: boolean;
};
export const MusicCard = ({ nowPlaying = false }: MusicCardProps) => {
  return (
    <Paper elevation={3} sx={{ padding: "12px", borderRadius: 1, mb: 2 }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        spacing={3}
      >
        <Box>
          <Typography variant="body1">Lose it</Typography>
          <Typography variant="body2">Flume . Vic Mensa</Typography>
        </Box>

        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          padding={1}
          sx={{
            borderRadius: "100%",
            boxShadow: nowPlaying
              ? (theme) => theme.custom.inset
              : (theme) => theme.custom.default,
          }}
        >
          {nowPlaying ? <Pause color="action" /> : <PlayArrow color="action" />}
        </Stack>
      </Stack>
    </Paper>
  );
};
