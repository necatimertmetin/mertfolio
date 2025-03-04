import {
  AccordionSummary,
  Stack,
  Avatar,
  Box,
  Typography,
  AccordionDetails,
} from "@mui/material";
import { FaWhatsapp, FaTelegramPlane, FaPhone } from "react-icons/fa";
import { SocialButton } from "../SocialButton";

export const Phone = () => {
  return (
    <>
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Stack direction={"row"} alignItems={"center"}>
          <Avatar
            sx={{
              backgroundColor: (theme) => theme.palette.secondary.main,
            }}
          >
            <FaPhone />
          </Avatar>
          <Box ml={1}>
            <Typography variant="body1">Phone</Typography>
          </Box>
        </Stack>
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
            link="https://t.me/kurufasulepilav"
          />
        </Stack>
      </AccordionDetails>
    </>
  );
};
