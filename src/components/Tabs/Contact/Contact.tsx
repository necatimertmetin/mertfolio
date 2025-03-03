import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import {
  FaAddressCard,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { SocialButton } from "./SocialButton";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import { Mail, Phone } from "@mui/icons-material";
import { useThemeMode } from "../../../App";

export const Contact = () => {
  const [showForm, setShowForm] = useState(false);
  const { isDarkMode } = useThemeMode();
  return (
    <Box>
      <Typography variant="h3" fontWeight={200} gutterBottom>
        {isDarkMode ? "Let’s Create in the Shadows" : "Let's Build Together"}
      </Typography>
      <Stack direction="row" spacing={2} alignItems={"stretch"}>
        <Stack flex={1}>
          <List sx={{ p: 0 }}>
            <ListItemButton
              sx={{
                boxShadow: (theme) => theme.custom.default,
                borderRadius: 2,
                mb: 2,
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    backgroundColor: (theme) => theme.palette.secondary.main,
                  }}
                >
                  <Phone />
                </Avatar>
              </ListItemAvatar>
              <ListItemText secondary="+90 545 317 05 50">Phone</ListItemText>
            </ListItemButton>
            <ListItemButton
              sx={{
                boxShadow: (theme) => theme.custom.default,
                borderRadius: 2,
                mb: 2,
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    backgroundColor: (theme) => theme.palette.secondary.main,
                  }}
                >
                  <Mail />
                </Avatar>
              </ListItemAvatar>
              <ListItemText secondary="necatimertmetin@gmail.com">
                Email
              </ListItemText>
            </ListItemButton>
            <ListItemButton
              sx={{
                boxShadow: (theme) => theme.custom.default,
                borderRadius: 2,
                mb: 2,
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    backgroundColor: (theme) => theme.palette.secondary.main,
                  }}
                >
                  <FaAddressCard />
                </Avatar>
              </ListItemAvatar>
              <ListItemText secondary="Cumhuriyet Cad. No 87. Orhangazi / Bursa">
                Address
              </ListItemText>
            </ListItemButton>
          </List>
        </Stack>
        <Stack
          sx={{ boxShadow: (theme) => theme.custom.inset, borderRadius: 3 }}
          p={2}
          spacing={3}
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
