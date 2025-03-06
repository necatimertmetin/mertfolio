import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import axios from "axios";
import { useAudioAnalyzer } from "../hooks/useAudioAnalyzer";

const streamUrl = "https://radio-streaming-api.onrender.com/stream";
const metadataUrl = "https://radio-streaming-api.onrender.com/music-info";

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
      elapsedTime: number;
    };
    previousTrack: {
      title: string;
      artist: string;
      album: string;
      albumArt: string | null;
      duration: number;
      elapsedTime: number;
    };
    nextTrack: {
      title: string;
      artist: string;
      album: string | null;
      albumArt: string | null;
      duration: number;
      elapsedTime: number;
    };
  } | null;
  streamAvailable: boolean; // Add this field
}

const MusicPlayerContext = createContext<MusicPlayerContextType | null>(null);

export const MusicPlayerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const streamAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [musicInfo, setMusicInfo] =
    useState<MusicPlayerContextType["musicInfo"]>(null);
  const [streamAvailable, setStreamAvailable] = useState<boolean>(false); // Track stream availability
  const storedVolume = localStorage.getItem("volume");
  const [volume, setVolume] = useState<number>(
    storedVolume ? parseFloat(storedVolume) : 0.1
  );

  // Initialize audio when the component is mounted
  useEffect(() => {
    if (!streamAudioRef.current) {
      streamAudioRef.current = new Audio(streamUrl);
      streamAudioRef.current.crossOrigin = "anonymous"; // CORS issue fix
    }

    // Check stream availability
    streamAudioRef.current?.addEventListener("error", () => {
      setStreamAvailable(false); // If error occurs, set streamAvailable to false
    });

    return () => {
      if (streamAudioRef.current) {
        streamAudioRef.current.pause();
        streamAudioRef.current.src = "";
        streamAudioRef.current.load();
      }
    };
  }, []);

  // Fetch music info and update the context state
  const fetchMusicInfo = useCallback(() => {
    axios
      .get(metadataUrl)
      .then((response) => {
        const data = response.data;
        setMusicInfo(data);
        setDuration(data.currentTrack.duration);
      })
      .catch((error) => {
        console.error("Error fetching music info:", error);
      });
  }, []);

  useEffect(() => {
    fetchMusicInfo();
  }, [fetchMusicInfo]);

  // Set volume and update current time on every playback
  useEffect(() => {
    const streamAudio = streamAudioRef.current;
    if (streamAudio) {
      streamAudio.volume = volume;
      const updateTime = () => setCurrentTime(streamAudio.currentTime);
      streamAudio.addEventListener("timeupdate", updateTime);
      return () => {
        streamAudio.removeEventListener("timeupdate", updateTime);
      };
    }
  }, [volume]);

  const bassLevel = useAudioAnalyzer(streamAudioRef.current);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => {
      const streamAudio = streamAudioRef.current;
      if (!prev && streamAudio && streamAvailable) {
        streamAudio
          .play()
          .catch((err) => console.error("Error playing audio:", err));
      } else if (streamAudio) {
        streamAudio.pause();
      }
      return !prev;
    });
  }, [streamAvailable]);

  // Store the volume setting in localStorage
  useEffect(() => {
    localStorage.setItem("volume", volume.toString());
  }, [volume]);

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
        streamAvailable, // Provide the stream availability
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
