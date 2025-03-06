import { Pause, PlayArrow } from "@mui/icons-material";
import { Box, Paper, Stack, Typography } from "@mui/material";

type MusicCardProps = {
  nowPlaying?: boolean;
  musicDetails?: {
    title: string;
    artist: string;
    album: string | null;
    albumArt: string | null;
    duration: number;
  };
};
export const MusicCard = ({
  musicDetails,
  nowPlaying = false,
}: MusicCardProps) => {
  return (
    <Paper elevation={3} sx={{ padding: "12px", borderRadius: 2, mb: 2 }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        spacing={3}
      >
        <Box>
          <Typography
            variant="body1"
            width={"5vw"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            whiteSpace={"pre"}
          >
            {musicDetails?.title}
          </Typography>
          <Typography
            variant="body2"
            maxWidth={"5vw"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            whiteSpace={"pre"}
          >
            {musicDetails?.artist}
          </Typography>
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
