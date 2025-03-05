import { Box, Divider, Stack, Tooltip, Typography } from "@mui/material";
import Slider from "react-slick";
import {
  SiDotnet,
  SiFigma,
  SiFirebase,
  SiGit,
  SiJavascript,
  SiMui,
  SiPhp,
  SiPostgresql,
  SiReact,
  SiSpring,
  SiTypescript,
} from "react-icons/si";
import { GrMysql } from "react-icons/gr";
import { FaJava } from "react-icons/fa";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const technologies = [
  {
    component: <SiPostgresql fontSize="64px" color="#31648D" />,
    id: "Postgre",
  },
  {
    component: <SiTypescript fontSize="64px" color="#3178C6" />,
    id: "Typescript",
  },
  {
    component: <SiJavascript fontSize="64px" color="#F7DF1E" />,
    id: "Javascript",
  },
  { component: <SiReact fontSize="64px" color="#61DAFB" />, id: "React" },
  { component: <SiFigma fontSize="64px" color="#F24E1E" />, id: "Figma" },
  { component: <SiMui fontSize="64px" color="#007FFF" />, id: "Mui" },
  { component: <SiPhp fontSize="64px" color="#8E44AD" />, id: "Php" },
  { component: <FaJava fontSize="64px" color="#007396" />, id: "Java" },
  { component: <SiDotnet fontSize="64px" color="#512BD4" />, id: "Dotnet" },
  { component: <SiSpring fontSize="64px" color="#6DB33F" />, id: "Spring" },
  { component: <GrMysql fontSize="64px" color="#00618A" />, id: "Mysql" },
  { component: <SiFirebase fontSize="64px" color="#FFCA28" />, id: "Firebase" },
  { component: <SiGit fontSize="64px" color="#F05032" />, id: "Git" },
];

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 0,
  speed: 5000,
  cssEase: "linear",
  slidesToShow: 5,
  slidesToScroll: 1,
};

export const AboutMe = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h2" letterSpacing={2} fontWeight={200}>
        About Me
      </Typography>

      <Divider sx={{ my: 2 }} />
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom>
          Hi, I'm a passionate{" "}
          <Typography component="span" fontWeight="bold" color="primary">
            Frontend Developer
          </Typography>
          ,{" "}
          <Typography component="span" fontWeight="bold" color="primary">
            UI/UX Designer
          </Typography>{" "}
          , and{" "}
          <Typography component="span" fontWeight="bold" color="primary">
            Mobile Developer
          </Typography>{" "}
          with a background in{" "}
          <Typography component="span" fontWeight="bold" color="primary">
            Computer Engineering
          </Typography>
          . With a deep interest in creating intuitive and user-friendly
          applications, building seamless experiences from both the frontend and
          backend.
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h4" gutterBottom>
        Technologies
      </Typography>

      <Box
        width={720}
        pt={1}
        sx={{
          boxShadow: (theme: { custom: { inset: string } }) =>
            theme.custom.inset,
          borderRadius: 3,
        }}
      >
        <Slider {...settings}>
          {technologies.map((tech) => tech.component)}
        </Slider>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="body1" gutterBottom>
        Feel free to check out my projects and get in touch for potential
        collaborations!
      </Typography>
    </Box>
  );
};
