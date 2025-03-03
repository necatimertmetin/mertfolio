import { Box, Paper, Stack } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";
import albumCoverExample from "../../../../assets/channels4_profile.jpg";
import { useMusicPlayer } from "../../../../context/useMusicPlayer";

interface AlbumCoverProps {
  size?: "small" | "default";
}

export default function AlbumCover({ size = "default" }: AlbumCoverProps) {
  const { bassLevel } = useMusicPlayer();
  const [ripples, setRipples] = useState<{ id: number; level: number }[]>([]);

  const handleBassLevelChange = useCallback(
    debounce((level: number) => {
      if (size === "small") return; // Eğer boyut small ise ripple oluşturma

      const id = Date.now();
      setRipples((prev) => [...prev, { id, level }]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
      }, 1000);
    }, 10),
    [size]
  );

  useEffect(() => {
    if (bassLevel > 0 && size !== "small") {
      handleBassLevelChange(bassLevel);
    }
  }, [bassLevel, handleBassLevelChange]);

  return (
    <Paper
      elevation={4}
      component={Stack}
      sx={{
        borderRadius: "100%",
        padding: 1,
        transform:
          bassLevel > 1
            ? `scale(${Math.min(
                Math.max(0.5 + (bassLevel / 255) * 1.2, 0.5),
                2
              )})`
            : "none",
        zIndex: 300,
        position: "relative",
        overflow: "visible",
      }}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {/* Ripple efektlerini sadece default boyutta göster */}
      {size !== "small" &&
        ripples.map((ripple) => (
          <Box
            key={ripple.id}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: "1px solid transparent",
              boxShadow: (theme) => theme.custom.inset,
              transform: "translate(-50%, -50%)",
              animation: `rippleEffect 1s ease-out`,
              pointerEvents: "none",
              filter: "blur(3px)",
              zIndex: "-100",
            }}
          />
        ))}

      <img
        src={albumCoverExample}
        style={{
          objectFit: "contain",
          borderRadius: "100%",
          width: size === "small" ? "50px" : "146px",
          zIndex: "3",
        }}
      />

      <style>
        {`
        @keyframes rippleEffect {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }
      `}
      </style>
    </Paper>
  );
}
