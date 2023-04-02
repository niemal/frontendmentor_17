import styled from "styled-components";
import { useContext } from "react";
import { MainContext } from "../MainBody";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { QUERIES } from "../constants";
import ClickableWrapper from "../ClickableWrapper";

const Wrapper = styled.div`
  min-width: 100%;
  background-color: var(--color-elements-${(p) => p.themestate});
  transition: all 0.3s ease-in-out;
  border-bottom: 1px solid var(--color-background-${(p) => p.themestate});
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1),
    0 2px 4px rgba(0, 0, 0, 0.06);

  padding: 0px 24px;
  ${
    "" /* @media ${QUERIES.tabletAndSmaller} {
    padding: 0px 24px;
  } */
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0px;
  margin: 0 auto;
  transition: all 0.3s ease-in-out;
`;

const Title = styled.a`
  text-decoration: none;
  font-weight: var(--font-weight-extrabold);
  font-size: ${24 / 16}rem;
  color: var(--color-text-${(p) => p.themestate});
  transition: all 0.3s ease-in-out;
  user-select: none;

  &:focus {
    ${(p) =>
      p.isKeyboardFocused
        ? `
    outline: 3px solid var(--color-text-${p.themestate});
    outline-offset: 6px;
    `
        : ""}
  }

  @media ${QUERIES.phoneAndSmaller} {
    font-size: ${16 / 16}rem;
  }
`;

const ThemeSwitchWrapper = styled(motion.div)`
  position: relative;
  display: flex;
  gap: 16px;
  align-items: start;
  cursor: pointer;

  transition: all 0.3s ease-in-out;

  &:focus {
    ${(p) =>
      p.isKeyboardFocused
        ? `
    outline: 2px solid var(--color-text-${p.themestate});
    outline-offset: 4px;
    `
        : ""}
  }
`;

const ThemeIconContainer = styled(motion.div)`
  width: 17px;
  height: 17px;
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
`;

const ModeText = styled.span`
  color: var(--color-text-${(p) => p.themestate});
  font-weight: var(--font-weight-semibold);
  user-select: none;
`;

const zoomOutIn = {
  hidden: {
    scale: 0.9,
    opacity: 1,
    top: 0,
    left: -24,
    position: "absolute",
  },
  exit: {
    scale: 1.2,
    opacity: 0,
    top: -17,
    left: 34,
    position: "absolute",
    animate: {
      scale: [1, 1.1, 2],
      opacity: [1, 0.7, 0.3],
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  },
  enter: {
    scale: 1,
    opacity: 1,
    position: "static",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
    animate: {
      scale: [0.9, 1.2, 1],
      opacity: [0, 1, 1],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  },
};
function NavBar() {
  const { theme, setTheme } = useContext(MainContext);
  const animationControl = useAnimation();

  const handleThemeSwitch = () => {
    setTheme((prevTheme) => (prevTheme === 0 ? 1 : 0));
  };

  return (
    <Wrapper themestate={theme}>
      <Container>
        <ClickableWrapper
          href={"/frontendmentor_17/"}
          onClick={() => {
            window.location = "/frontendmentor_17/";
          }}
          themestate={theme}
        >
          <Title>Where in the world?</Title>
        </ClickableWrapper>

        <ClickableWrapper onClick={handleThemeSwitch} themestate={theme}>
          <ThemeSwitchWrapper>
            <AnimatePresence>
              <ThemeIconContainer
                key={theme}
                exit="exit"
                initial="hidden"
                animate={animationControl}
                variants={zoomOutIn}
              >
                <Image
                  key={theme}
                  src={`/frontendmentor_17/theme-${
                    theme === 0 ? 1 : 0
                  }-icon.svg`}
                  alt={`${theme === 0 ? "dark" : "light"} theme icon image`}
                />
              </ThemeIconContainer>
            </AnimatePresence>
            <ModeText themestate={theme}>
              {theme === 0 ? "Dark Mode" : "Light Mode"}
            </ModeText>
          </ThemeSwitchWrapper>
        </ClickableWrapper>
      </Container>
    </Wrapper>
  );
}

export default NavBar;
