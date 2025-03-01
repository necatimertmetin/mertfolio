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
  const [streamAudio] = useState(new Audio());
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

  // Fetch music metadata function
  const fetchMusicInfo = () => {
    axios
      .get(metadataUrl)
      .then((response) => {
        console.log("Music Info:", response.data);
        setMusicInfo(response.data);
      })
      .catch((error) => {
        console.error("Error fetching music info:", error);
      });
  };

  useEffect(() => {
    // Fetch music metadata and audio stream
    fetchMusicInfo();

    axios
      .get(streamUrl, { responseType: "blob" })
      .then((response) => {
        const url = URL.createObjectURL(response.data);
        streamAudio.src = url;
      })
      .catch((error) => {
        console.error("Error fetching audio stream:", error);
      });
  }, []);

  const bassLevel = useAudioAnalyzer(streamAudio);

  useEffect(() => {
    // Set volume and event listeners for streamAudio
    streamAudio.volume = volume;
    streamAudio.addEventListener("canplay", () => {
      setDuration(streamAudio.duration);
      console.log("Audio is ready to play");
    });
    streamAudio.addEventListener("timeupdate", () => {
      setCurrentTime(streamAudio.currentTime);
    });
    streamAudio.addEventListener("ended", () => {
      // Fetch music info again when current track ends
      fetchMusicInfo(); // Re-fetch music info on track end
    });
    streamAudio.addEventListener("error", (err) => {
      console.error("Error loading audio:", err);
    });

    return () => {
      streamAudio.removeEventListener("canplay", () => {});
      streamAudio.removeEventListener("timeupdate", () => {});
      streamAudio.removeEventListener("ended", () => {});
      streamAudio.removeEventListener("error", () => {});
    };
  }, [volume]);

  const togglePlay = () => {
    if (isPlaying) {
      streamAudio.pause();
    } else {
      streamAudio.play().catch((err) => {
        console.error("Error playing audio:", err);
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
        musicInfo,
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
