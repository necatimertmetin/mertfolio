import { Button } from "@mui/material";
import React from "react";

type SocialButtonProps = {
  icon: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
};

export const SocialButton = ({ icon, onClick, active }: SocialButtonProps) => {
  return (
    <Button
      onClick={onClick}
      color="secondary"
      disableRipple
      sx={{
        boxShadow: active
          ? (theme) => theme.custom.inset
          : (theme) => theme.custom.default,
        p: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        cursor: "pointer",
        minWidth: "0px",
      }}
    >
      {icon}
    </Button>
  );
};
