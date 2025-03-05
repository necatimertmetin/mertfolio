import { Button } from "@mui/material";
import React from "react";

type SocialButtonProps = {
  width?: number;
  icon: React.ReactNode;
  link?: string;
  active?: boolean;
  title?: string;
  disabled?: boolean;
  onClick?: () => void;
  iconPosition?: "start" | "end";
};

export const SocialButton = ({
  width,
  icon,
  link,
  active,
  title,
  disabled = false,
  onClick,
  iconPosition = "start",
}: SocialButtonProps) => {
  return (
    <Button
      disableRipple
      onClick={onClick}
      component="a"
      href={link}
      disabled={disabled}
      target="_blank"
      rel="noopener noreferrer"
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
        width: width,
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
