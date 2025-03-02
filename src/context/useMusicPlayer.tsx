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
  const streamAudioRef = useRef(new Audio());
  const streamAudio = streamAudioRef.current;
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState<number>(0.1);
  const [musicInfo, setMusicInfo] =
    useState<MusicPlayerContextType["musicInfo"]>(null);
  const prevTrackRef = useRef<string | null>(null);

  const fetchMusicInfo = useCallback(() => {
    axios
      .get(metadataUrl)
      .then((response) => {
        const data = response.data;
        // Update only if the current track title has changed
        if (data.currentTrack.title !== prevTrackRef.current) {
          setMusicInfo(data);
          setDuration(data.currentTrack.duration);
          prevTrackRef.current = data.currentTrack.title;
        }
      })
      .catch((error) => {
        console.error("Error fetching music info:", error);
      });
  }, []);

  const fetchMusicStream = useCallback(() => {
    axios
      .get(streamUrl, { responseType: "blob" })
      .then((response) => {
        const url = URL.createObjectURL(response.data);
        streamAudio.src = url;
        streamAudio
          .play()
          .catch((err) => console.error("Error playing audio:", err));
      })
      .catch((error) => console.error("Error fetching audio stream:", error));
  }, [streamAudio]);

  useEffect(() => {
    fetchMusicStream();
    fetchMusicInfo();
  }, [fetchMusicStream, fetchMusicInfo]);

  useEffect(() => {
    streamAudio.volume = volume;
    const updateTime = () => setCurrentTime(streamAudio.currentTime);
    streamAudio.addEventListener("timeupdate", updateTime);

    // Listen for when the song ends
    const handleSongEnd = () => {
      // Fetch new music stream and music info when the song ends
      fetchMusicStream();
      fetchMusicInfo();
    };

    streamAudio.addEventListener("ended", handleSongEnd);

    return () => {
      streamAudio.removeEventListener("timeupdate", updateTime);
      streamAudio.removeEventListener("ended", handleSongEnd);
    };
  }, [volume, fetchMusicStream, fetchMusicInfo]);

  const bassLevel = useAudioAnalyzer(streamAudio);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => {
      if (prev) {
        streamAudio.pause();
      } else {
        streamAudio
          .play()
          .catch((err) => console.error("Error playing audio:", err));
      }
      return !prev;
    });
  }, [streamAudio]);

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
