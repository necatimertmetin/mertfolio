import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { FaCode, FaExternalLinkAlt } from "react-icons/fa"; // React Icons'dan ikonlar

type DisplayProps = {
  link: string;
  sourceCode: string;
};

export const Display = ({ link, sourceCode }: DisplayProps) => {
  const theme = useTheme(); // Tema nesnesini al
  return (
    <Stack direction={"row"} justifyContent={"center"}>
      <Box
        sx={{
          border: "8px solid transparent",
          background: theme.palette.background.default,
          boxShadow: `${theme.custom?.default}, ${theme.custom?.inset}`, // Doğrudan tema kullanımı
          borderRadius: 3,
          overflow: "hidden",
          position: "relative",
          zIndex: 300,
          "::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            boxShadow: `${theme.custom?.inset}`, // Önce gölgeyi uygula
            zIndex: 300,
          },
        }}
        width={"640px"}
        height={"366px"}
      >
        <iframe
          src={link}
          loading="lazy"
          style={{
            width: "1920px",
            height: "1080px",
            transform: `scale(${622 / 1920})`,
            transformOrigin: "0 0",
            border: "none",
            zIndex: 300,
          }}
        />
      </Box>
      <Box sx={{ position: "relative" }}>
        <Button
          variant="contained"
          endIcon={<FaCode color={theme.palette.text.primary} />}
          component="a"
          href={sourceCode}
          target="_blank" // Opens the link in a new tab
          rel="noopener noreferrer" // Security precaution
          sx={{
            position: "absolute",
            top: "45px",
            left: "-120px",
            textWrap: "nowrap",
            zIndex: 100,
            pointerEvents: "all",
            background: theme.palette.background.default,
            transition: "left 0.3s", // Animasyon ekleyerek geçişi yumuşatıyoruz
            "&:hover": {
              left: 0, // Hover durumunda sol konumu sıfırlıyoruz
            },
          }}
        >
          <Typography
            variant="body2"
            textTransform={"capitalize"}
            fontWeight={600}
            color={theme.palette.text.primary}
          >
            To Source Code
          </Typography>
        </Button>
        <Button
          variant="contained"
          endIcon={<FaExternalLinkAlt color={theme.palette.text.primary} />}
          component="a"
          href={link}
          target="_blank" // Opens the link in a new tab
          rel="noopener noreferrer" // Security precaution
          sx={{
            position: "absolute",
            top: "5px",
            left: "-82px",
            textWrap: "nowrap",
            zIndex: 100,
            pointerEvents: "all",

            background: theme.palette.background.default,
            transition: "left 0.3s", // Animasyon ekleyerek geçişi yumuşatıyoruz
            "&:hover": {
              left: 0, // Hover durumunda sol konumu sıfırlıyoruz
            },
          }}
        >
          <Typography
            variant="body2"
            textTransform={"capitalize"}
            fontWeight={600}
            color={theme.palette.text.primary}
          >
            To Project
          </Typography>
        </Button>
      </Box>
    </Stack>
  );
};
