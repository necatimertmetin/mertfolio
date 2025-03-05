import { Button } from "@mui/material";
import React from "react";

type SocialButtonProps = {
  icon: React.ReactNode;
  link?: string;
  active?: boolean;
  title?: string;
  disabled?: boolean;
  onClick?: () => void;
  iconPosition?: "start" | "end"; // Buradaki hata düzeltildi.
};

export const SocialButton = ({
  icon,
  link,
  active,
  title,
  disabled = false,
  onClick,
  iconPosition = "start", // Varsayılan olarak 'start' ekledik
}: SocialButtonProps) => {
  return (
    <Button
      disableRipple
      onClick={onClick}
      component="a" // Change the Button to behave like a link
      href={link}
      disabled={disabled}
      target="_blank" // Opens the link in a new tab
      rel="noopener noreferrer" // Security precaution
      color="secondary"
      sx={{
        textDecorationLine: disabled ? "line-through" : "",
        boxShadow: disabled
          ? (theme) => theme.custom.inset
          : active
          ? (theme) => theme.custom.inset
          : (theme) => theme.custom.default,
        p: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        cursor: "pointer",
        minWidth: "0px",
        gap: 1,
        textTransform: "capitalize",
        "&:active": {
          boxShadow: (theme) => theme.custom.inset,
          transform: "scale(98%)",
        },
      }}
    >
      {iconPosition === "end" ? (
        <>
          {title}
          {icon}
        </>
      ) : (
        <>
          {icon}
          {title}
        </>
      )}
    </Button>
  );
};
