import { Paper, Stack, Typography } from "@mui/material";
import { MusicCard } from "./MusicCard";
import { motion, AnimatePresence } from "framer-motion";
import { useMusicPlayer } from "../../../../context/useMusicPlayer";

export const Playlist = () => {
  const { musicInfo } = useMusicPlayer(); // Use the context here without wrapping it in provider
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <Stack spacing={1}>
          <Paper
            sx={{
              padding: "12px 24px",
              borderRadius: 3,
              boxShadow: (theme) => theme.custom.inset,
            }}
          >
            <Typography variant="h5" textAlign={"center"}>
              Playlist
            </Typography>
          </Paper>
          <Paper
            sx={{
              padding: 2,
              borderRadius: 3,
              boxShadow: (theme) => theme.custom.inset,
              height: "460px",
            }}
          >
            <MusicCard musicDetails={musicInfo?.previousTrack} />
            <MusicCard nowPlaying musicDetails={musicInfo?.currentTrack} />
            <MusicCard musicDetails={musicInfo?.nextTrack} />
          </Paper>
        </Stack>
      </motion.div>
    </AnimatePresence>
  );
};
