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
      album: string;
      albumArt: string | null;
      duration: number;
      elapsedTime: number;
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
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [musicInfo, setMusicInfo] =
    useState<MusicPlayerContextType["musicInfo"]>(null);
  const prevTrackRef = useRef<string | null>(null);
  const storedVolume = localStorage.getItem("volume");
  const [volume, setVolume] = useState<number>(
    storedVolume ? parseFloat(storedVolume) : 0.1
  );

  const fetchMusicInfo = useCallback(() => {
    axios
      .get(metadataUrl)
      .then((response) => {
        const data = response.data;
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
    fetchMusicInfo();
  }, [fetchMusicInfo]);

  useEffect(() => {
    streamAudio.volume = volume;
    const updateTime = () => setCurrentTime(streamAudio.currentTime);
    streamAudio.addEventListener("timeupdate", updateTime);

    const handleSongEnd = () => {
      // Şarkı bittiğinde yeni şarkıyı almak için:
      if (musicInfo && musicInfo.nextTrack) {
        setMusicInfo((prev) => ({
          ...prev!,
          currentTrack: musicInfo.nextTrack,
          previousTrack: musicInfo.currentTrack,
          nextTrack: musicInfo.nextTrack, // burada, bir sonraki şarkıyı güncellediğimizden emin olun
        }));
        fetchMusicStream(); // Yeni müzik akışını başlat
        streamAudio.play(); // Yeni şarkıyı çalmaya başla
      }
    };

    streamAudio.addEventListener("ended", handleSongEnd);

    return () => {
      streamAudio.removeEventListener("timeupdate", updateTime);
      streamAudio.removeEventListener("ended", handleSongEnd);
    };
  }, [volume, fetchMusicStream, fetchMusicInfo, musicInfo]);

  const bassLevel = useAudioAnalyzer(streamAudio);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => {
      if (!prev) {
        fetchMusicInfo();
        fetchMusicStream();
        streamAudio
          .play()
          .catch((err) => console.error("Error playing audio:", err));
      } else {
        streamAudio.pause();
      }
      return !prev;
    });
  }, [streamAudio, fetchMusicStream]);

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
