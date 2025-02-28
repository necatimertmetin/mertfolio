import { Paper, Stack, Box, Typography } from "@mui/material";
import { Lion } from "./Lion";

export const AvatarCard = () => {
  return (
    <Paper
      component={Stack}
      elevation={2}
      sx={{ padding: 3, borderRadius: 2, alignItems: "flex-end" }}
    >
      <Paper
        elevation={4}
        component={Stack}
        sx={{
          borderRadius: "100%",
          padding: 2,
          height: "196px",
          width: "196px",
        }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Lion width={128} />
      </Paper>
      <Stack direction={"row"} alignItems={"flex-end"} spacing={6}>
        <Box>
          <Typography variant="h1">I'm</Typography>
          <Typography variant="h2">Mert</Typography>
          <Typography variant="h2">METIN</Typography>
          <Typography>necatimertmetin@gmail.com</Typography>
        </Box>
      </Stack>
    </Paper>
  );
};
