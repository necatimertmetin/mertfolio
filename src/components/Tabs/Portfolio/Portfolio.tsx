import { Box, Stack, Typography, useTheme } from "@mui/material";
import { Display } from "./components/Display";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { SocialButton } from "../Contact/SocialButton";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  owner: {
    login: string;
  };
  has_pages: boolean;
  html_url: string;
};

const settings = {
  dots: false,
  arrows: false,
  lazyLoad: "ondemand" as const,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
};

export const Portfolio = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const sliderRef = useRef<Slider | null>(null);
  const theme = useTheme();
  const next = () => {
    sliderRef.current?.slickNext();
  };

  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  useEffect(() => {
    fetch("https://api.github.com/users/necatimertmetin/repos?per_page=500")
      .then((response) => response.json())
      .then((data: Repo[]) => {
        const pagesRepos = data.filter((repo) => repo.has_pages);
        setRepos(pagesRepos);
      })
      .catch((error) => console.error("Error fetching repos:", error));
  }, []);

  return (
    <Box sx={{ width: "768px", flex: 1 }}>
      <Slider ref={sliderRef} {...settings}>
        {repos.map((repo) => (
          <Stack spacing={2} key={repo.id}>
            <Typography variant="h4">{repo.name}</Typography>
            <Typography variant="body1">{repo.description}</Typography>
            <Stack
              direction={"row"}
              justifyContent={"center"}
              overflow={"visible"}
            >
              <Display
                link={`https://necatimertmetin.github.io/${repo.name}/`}
                sourceCode={repo.html_url}
              />
            </Stack>
          </Stack>
        ))}
      </Slider>
      <Stack direction={"row"} justifyContent={"space-between"} mt={1}>
        <SocialButton
          width={100}
          onClick={previous}
          title="Previous"
          icon={<FaAngleLeft color={theme.palette.text.primary} />}
        />
        <SocialButton
          width={100}
          onClick={next}
          title="Next"
          iconPosition="end"
          icon={<FaAngleRight color={theme.palette.text.primary} />}
        />
      </Stack>
    </Box>
  );
};
