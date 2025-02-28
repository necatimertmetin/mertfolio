import { useEffect, useRef, useState } from "react";
import { Paper, Stack, Typography, Box, LinearProgress } from "@mui/material";
import albumCoverExample from "../../../assets/Thriller-Album-Cover.png";
import * as mm from "music-metadata"; // music-metadata kütüphanesini içe aktar
import { ActionButtons } from "./components/ActionButtons";
import { Playlist } from "./components/Playlist";

const songFile = "/Mickey Valen, Joey Myron - Chills (Dark Version).mp3";

export const Radio = () => {
  const [playlistVisible, setPlaylistVisible] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [songTitle, setSongTitle] = useState<string>("Unknown Song");
  const [artistName, setArtistName] = useState<string>("Unknown Artist");
  const storedVolume = localStorage.getItem("volume");
  const [volume, setVolume] = useState<number>(
    storedVolume ? JSON.parse(storedVolume) : 0.1
  ); // Initial volume set to 0.1

  useEffect(() => {
    // Save the theme mode to localStorage whenever it changes
    localStorage.setItem("volume", JSON.stringify(volume));
  }, [volume]);

  const audioRef = useRef<HTMLAudioElement>(null);

  const fetchMetadata = async () => {
    const response = await fetch(songFile);
    const buffer = await response.arrayBuffer();

    mm.parseBuffer(new Uint8Array(buffer))
      .then((metadata) => {
        const title = metadata.common.title || "Unknown Song";
        const artist = metadata.common.artist || "Unknown Artist";
        setSongTitle(title);
        setArtistName(artist);
      })
      .catch((err) => console.error("Error reading metadata", err));
  };

  useEffect(() => {
    fetchMetadata();

    const audio = audioRef.current;

    if (audio) {
      // Set initial volume when the audio element is ready
      audio.volume = volume;

      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });

      const updateTime = () => setCurrentTime(audio.currentTime);
      audio.addEventListener("timeupdate", updateTime);

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
      };
    }
  }, [volume]); // Add volume as dependency to update when changed

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (_event: Event, newValue: number | number[]) => {
    if (audioRef.current) {
      const volumeValue = newValue as number;
      audioRef.current.volume = volumeValue;
      setVolume(volumeValue);
    }
  };

  return (
    <Stack
      direction="row"
      justifyContent={"space-between"}
      flex={1}
      spacing={1}
    >
      <Paper
        component={Stack}
        spacing={3}
        justifyContent={"space-between"}
        sx={{
          padding: 3,
          flex: 1,
          borderRadius: 1,
          boxShadow: (theme) => theme.custom.inset,
        }}
      >
        <Stack alignItems={"center"}>
          <Paper
            elevation={4}
            component={Stack}
            sx={{
              borderRadius: "100%",
              padding: 1,
            }}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <img
              src={albumCoverExample}
              style={{
                objectFit: "contain",
                borderRadius: "100%",
                width: "216px",
              }}
            />
          </Paper>
        </Stack>
        <Box>
          <Typography variant="h4" textAlign={"center"}>
            {songTitle}
          </Typography>
          <Typography variant="h5" textAlign={"center"}>
            {artistName}
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
          playlistVisible={playlistVisible}
          onListButtonClick={() => setPlaylistVisible(!playlistVisible)}
          isPlaying={isPlaying}
          onPlayButtonClick={togglePlay}
          volume={volume}
          onVolumeChange={handleVolumeChange}
        />
      </Paper>
      {playlistVisible && <Playlist />}
      <audio ref={audioRef} src={songFile} />
    </Stack>
  );
};
