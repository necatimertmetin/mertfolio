import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaTelegramPlane,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { SocialButton } from "./SocialButton";
import { LocationOn, Mail, Phone } from "@mui/icons-material";
import { useThemeMode } from "../../../App";
import React from "react";

export const Contact = () => {
  const { isDarkMode } = useThemeMode();
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <Box>
      <Typography variant="h3" fontWeight={200} gutterBottom>
        {isDarkMode ? "Let’s Create in the Shadows" : "Let's Build Together"}
      </Typography>
      <Stack direction="row" spacing={2} alignItems={"stretch"}>
        <Stack flex={1}>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
            sx={{
              gap: 2,
              boxShadow: (theme) => theme.custom.default,
            }}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Avatar
                sx={{
                  backgroundColor: (theme) => theme.palette.secondary.main,
                }}
              >
                <Phone />
              </Avatar>
              <Box ml={1}>
                <Typography variant="body1">Phone</Typography>
                <Typography variant="body2">+90 545 317 05 50</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Stack direction={"row-reverse"} spacing={3}>
                <SocialButton
                  icon={<FaWhatsapp fontSize={"32px"} />}
                  title="Whatsapp"
                />
                <SocialButton
                  icon={<FaTelegramPlane fontSize={"32px"} />}
                  title="Telegram"
                />
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
            sx={{
              gap: 2,
              boxShadow: (theme) => theme.custom.default,
            }}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Avatar
                sx={{
                  backgroundColor: (theme) => theme.palette.secondary.main,
                }}
              >
                <Mail />
              </Avatar>
              <Box ml={1}>
                <Typography variant="body1">Email</Typography>
                <Typography variant="body2">
                  necatimertmetin@gmail.com
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
            sx={{
              gap: 2,
              boxShadow: (theme) => theme.custom.default,
            }}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Avatar
                sx={{
                  backgroundColor: (theme) => theme.palette.secondary.main,
                }}
              >
                <LocationOn />
              </Avatar>
              <Box ml={1}>
                <Typography variant="body1">Address</Typography>
                <Typography variant="body2">
                  Cumhuriyet Cad. No 87. Orhangazi / Bursa
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Stack>
        <Stack
          sx={{ boxShadow: (theme) => theme.custom.inset, borderRadius: 3 }}
          p={2}
          spacing={3}
          justifyContent={"space-evenly"}
        >
          <SocialButton icon={<FaGithub fontSize={"32px"} />} />
          <SocialButton icon={<FaLinkedin fontSize={"32px"} />} />
          <SocialButton icon={<FaInstagram fontSize={"32px"} />} />
          <SocialButton icon={<FaYoutube fontSize={"32px"} />} />
        </Stack>
      </Stack>
    </Box>
  );
};
