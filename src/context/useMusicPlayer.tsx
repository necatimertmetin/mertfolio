import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAudioAnalyzer } from "../hooks/useAudioAnalyzer";

const streamUrl = "http://localhost:3001/stream";
const metadataUrl = "http://localhost:3001/music-info";

interface MusicPlayerContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  volume: number;
  setVolume: (volume: number) => void;
  duration: number;
  currentTime: number;
  bassLevel: number;
  musicInfo: {
    currentTrack: {
      title: string;
      artist: string;
      album: string;
      albumArt: string | null;
      duration: number;
    };
    previousTrack: {
      title: string;
      artist: string;
      album: string;
      albumArt: string | null;
      duration: number;
    };
    nextTrack: {
      title: string;
      artist: string;
      album: string;
      albumArt: string | null;
      duration: number;
    };
  } | null;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | null>(null);

export const MusicPlayerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [streamAudio] = useState(new Audio()); // We will set the stream URL dynamically
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState<number>(
    localStorage.getItem("volume")
      ? JSON.parse(localStorage.getItem("volume")!)
      : 0.1
  );
  const [musicInfo, setMusicInfo] = useState<{
    currentTrack: {
      title: string;
      artist: string;
      album: string;
      albumArt: string | null;
      duration: number;
    };
    previousTrack: {
      title: string;
      artist: string;
      album: string;
      albumArt: string | null;
      duration: number;
    };
    nextTrack: {
      title: string;
      artist: string;
      album: string;
      albumArt: string | null;
      duration: number;
    };
  } | null>(null);

  // Fetch the music stream and metadata
  useEffect(() => {
    // Fetch the music metadata
    axios
      .get(metadataUrl)
      .then((response) => {
        console.log("Music Info:", response.data);
        setMusicInfo(response.data);
      })
      .catch((error) => {
        console.error("Error fetching music info:", error);
      });

    // Fetch the audio stream using Axios
    axios
      .get(streamUrl, { responseType: "blob" })
      .then((response) => {
        const url = URL.createObjectURL(response.data); // Convert blob to URL
        streamAudio.src = url; // Set the audio element source to the blob URL
      })
      .catch((error) => {
        console.error("Error fetching audio stream:", error);
      });
  }, []);

  // Get bass level using the useAudioAnalyzer hook
  const bassLevel = useAudioAnalyzer(streamAudio);

  useEffect(() => {
    // Set volume and attach event listeners on streamAudio
    streamAudio.volume = volume;
    streamAudio.addEventListener("canplay", () => {
      setDuration(streamAudio.duration); // Set duration when ready
      console.log("Audio is ready to play");
    });
    streamAudio.addEventListener("timeupdate", () => {
      setCurrentTime(streamAudio.currentTime); // Update current time
    });
    streamAudio.addEventListener("error", (err) => {
      console.error("Error loading audio:", err);
    });

    return () => {
      // Cleanup the event listeners
      streamAudio.removeEventListener("canplay", () => {});
      streamAudio.removeEventListener("timeupdate", () => {});
      streamAudio.removeEventListener("error", () => {});
    };
  }, [volume]);

  const togglePlay = () => {
    if (isPlaying) {
      streamAudio.pause();
    } else {
      streamAudio.play().catch((err) => {
        console.error("Error playing audio:", err); // Handle error
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        isPlaying,
        togglePlay,
        volume,
        setVolume,
        duration,
        currentTime,
        bassLevel,
        musicInfo, // Provide the musicInfo in the context
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error("useMusicPlayer must be used within a MusicPlayerProvider");
  }
  return context;
};
