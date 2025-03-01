import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAudioAnalyzer } from "../hooks/useAudioAnalyzer";

const songFile = "/HBz - Central Bass Boost (500k) (500K special).mp3";

interface MusicPlayerContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  volume: number;
  setVolume: (volume: number) => void;
  duration: number;
  currentTime: number;
  bassLevel: number; // Add bassLevel to the context
  audioRef?: React.RefObject<HTMLAudioElement | null>;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | null>(null);

export const MusicPlayerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const storedVolume = localStorage.getItem("volume");
  const [volume, setVolume] = useState<number>(
    storedVolume ? JSON.parse(storedVolume) : 0.1
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Get bass level using the useAudioAnalyzer hook
  const bassLevel = useAudioAnalyzer(audioRef.current);

  useEffect(() => {
    localStorage.setItem("volume", JSON.stringify(volume));
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      audio.addEventListener("loadeddata", () => {
        setDuration(audio.duration);
      });

      audio.addEventListener("canplay", () => {
        if (isPlaying) {
          audio.play();
        }
      });

      const updateTime = () => setCurrentTime(audio.currentTime);
      audio.addEventListener("timeupdate", updateTime);

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
      };
    }
  }, [volume, isPlaying]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch((err) => {
          console.error("Error playing audio:", err);
        });
      }
      setIsPlaying(!isPlaying);
    }
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
        bassLevel, // Provide the bassLevel in the context
        audioRef,
      }}
    >
      {children}
      <audio ref={audioRef} src={songFile} />
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
