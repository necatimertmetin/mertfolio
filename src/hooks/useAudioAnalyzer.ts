import { useEffect, useState, useRef } from "react";

export const useAudioAnalyzer = (audioElement: HTMLAudioElement | null) => {
  const [bassLevel, setBassLevel] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  useEffect(() => {
    if (!audioElement) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }
    const audioContext = audioContextRef.current;

    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    if (!sourceRef.current) {
      sourceRef.current = audioContext.createMediaElementSource(audioElement);
    }

    const analyser = audioContext.createAnalyser();
    sourceRef.current.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 512;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    let animationFrameId: number | null = null;

    const getBassLevel = () => {
      analyser.getByteFrequencyData(dataArray);
      const bass =
        dataArray.slice(0, 10).reduce((acc, val) => acc + val, 0) / 10;
      setBassLevel(bass);
      animationFrameId = requestAnimationFrame(getBassLevel);
    };

    getBassLevel();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      analyser.disconnect();
      if (audioContext.state !== "closed") {
        audioContext.close();
      }
    };
  }, [audioElement]);

  return bassLevel;
};
