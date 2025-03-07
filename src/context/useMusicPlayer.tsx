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
  handleUserGesture: () => void;
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

  const audioContextRef = useRef<AudioContext | null>(null);

  const initializeAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
  };

  useEffect(() => {
    console.log("Audio element:", streamAudioRef.current);
  }, [streamAudioRef.current]);

  // Add this inside your `useEffect` or event handler for user gestures
  const handleUserGesture = () => {
    // Initialize the AudioContext if not already initialized
    initializeAudioContext();

    // Resume the AudioContext if it was previously suspended
    if (audioContextRef.current?.state === "suspended") {
      audioContextRef.current.resume().then(() => {
        console.log("AudioContext resumed.");
      });
    }

    // Toggle play
    togglePlay();
  };

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
      if (!prev && streamAudio) {
        streamAudio
          .play()
          .then(() => console.log("Playback started"))
          .catch((err) => console.error("Playback error:", err));
      } else if (streamAudio) {
        streamAudio.pause();
        console.log("Playback paused");
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
        handleUserGesture,
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
