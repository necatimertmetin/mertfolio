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
  FaTelegramPlane,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { SocialButton } from "./SocialButton";
import { LocationOn, Mail, Phone } from "@mui/icons-material";
import { useThemeMode } from "../../../App";
import React from "react";
import { Location } from "./location/Location";
import { Email } from "./email/Email";

export const Contact = () => {
  const { isDarkMode } = useThemeMode();
  const [expanded, setExpanded] = React.useState<string | false>("panel2");

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
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Stack direction={"row"} alignItems={"center"}>
                <Avatar
                  sx={{
                    backgroundColor: (theme) => theme.palette.secondary.main,
                  }}
                >
                  <Phone />
                </Avatar>
                <Typography variant="body1" ml={1}>
                  Phone
                </Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Stack direction={"row-reverse"} spacing={3}>
                <SocialButton
                  icon={<FaTelegramPlane fontSize={"32px"} />}
                  title="Telegram"
                  link="https://t.me/kurufasulepilav"
                />
                <SocialButton
                  icon={<FaWhatsapp fontSize={"32px"} />}
                  title="Whatsapp"
                  disabled
                />
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
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
              <Email />
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
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
            <AccordionDetails sx={{ overflow: "hidden" }}>
              <Location />
            </AccordionDetails>
          </Accordion>
        </Stack>
        <Stack
          sx={{ boxShadow: (theme) => theme.custom.inset, borderRadius: 3 }}
          p={2}
          spacing={3}
          justifyContent={"space-around"}
        >
          <SocialButton
            link="https://github.com/necatimertmetin"
            icon={<FaGithub fontSize={"32px"} />}
          />
          <SocialButton
            link="https://www.linkedin.com/in/mrmetin/"
            icon={<FaLinkedin fontSize={"32px"} />}
          />
          <SocialButton
            link="https://www.instagram.com/metrosso/"
            icon={<FaInstagram fontSize={"32px"} />}
          />
          <SocialButton
            link="https://www.youtube.com/@metrosso5156"
            icon={<FaYoutube fontSize={"32px"} />}
          />
        </Stack>
      </Stack>
    </Box>
  );
};
