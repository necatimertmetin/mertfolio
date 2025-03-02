import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { SocialButton } from "./SocialButton";
import { MdEmail } from "react-icons/md";
import { useState } from "react";

export const Contact = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Contact Me
      </Typography>
      <Stack direction="row" spacing={2}>
        <Stack
          sx={{ boxShadow: (theme) => theme.custom.inset, borderRadius: 3 }}
          p={2}
          spacing={3}
        >
          <SocialButton icon={<FaGithub fontSize={"32px"} />} />
          <SocialButton icon={<FaLinkedin fontSize={"32px"} />} />
          <SocialButton icon={<FaInstagram fontSize={"32px"} />} />
          <SocialButton icon={<FaYoutube fontSize={"32px"} />} />
          <SocialButton
            icon={<MdEmail fontSize={"32px"} />}
            onClick={() => setShowForm(!showForm)}
            active={showForm}
          />
        </Stack>
        <Stack flex={1} maxHeight={"360px"}>
          {/* Map Section */}
          <Box
            sx={{
              boxShadow: (theme) => theme.custom.inset,
              borderRadius: 3,
              px: 2,
              py: showForm ? 0 : 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              maxHeight: showForm ? "0" : "500px", // Use max-height for smooth transition
              overflow: "hidden", // Hide content when collapsed
              transition: "max-height 5s ease", // Smooth transition for max-height
            }}
          >
            <Typography variant="h5" gutterBottom>
              Our Location
            </Typography>
            <Typography variant="body1">
              Address: 123 Example St, City, Country
            </Typography>
            <Typography variant="body1">Phone: (123) 456-7890</Typography>
            <Typography variant="body1">Email: example@example.com</Typography>
            {/* Insert actual map component here */}
            <Box sx={{ height: 200, backgroundColor: "#e0e0e0", marginTop: 2 }}>
              {/* Example placeholder for the map */}
              Map Here
            </Box>
          </Box>
          <Box
            sx={{
              boxShadow: (theme) => theme.custom.inset,
              borderRadius: 3,
              p: !showForm ? 0 : 2,

              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              maxHeight: !showForm ? "0" : "500px", // Use max-height for smooth transition
              overflow: "hidden", // Hide content when collapsed
              transition: "max-height 5s ease", // Smooth transition for max-height
            }}
          >
            <Typography variant="h5" gutterBottom>
              Get in Touch
            </Typography>
            <form>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Message"
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" fullWidth>
                Send Message
              </Button>
            </form>
          </Box>
          {/* Contact Form Section */}
        </Stack>
      </Stack>
    </Box>
  );
};
