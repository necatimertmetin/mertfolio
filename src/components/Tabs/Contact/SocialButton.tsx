import { Button } from "@mui/material";
import React from "react";

type SocialButtonProps = {
  icon: React.ReactNode;
  link?: string;
  active?: boolean;
  title?: string;
  disabled?: boolean;
};

export const SocialButton = ({
  icon,
  link,
  active,
  title,
  disabled = false,
}: SocialButtonProps) => {
  return (
    <Button
      disableRipple
      component="a" // Change the Button to behave like a link
      href={link}
      disabled={disabled}
      target="_blank" // Opens the link in a new tab
      rel="noopener noreferrer" // Security precaution
      color="secondary"
      sx={{
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
      {icon}
      {title}
    </Button>
  );
};
