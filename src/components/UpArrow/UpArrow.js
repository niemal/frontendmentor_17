import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import ClickableWrapper from "../ClickableWrapper";
import { hoverSupported } from "../hoverSupported";

const Wrapper = styled(motion.button)`
  position: fixed;
  z-index: 9999;
  cursor: pointer;
  bottom: 24px;
  right: 24px;
  border-radius: 50%;
  display: grid;
  place-content: center;
  padding: 8px;
  background-color: var(--color-elements-${(p) => p.themestate});
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06),
    0 1px 2px rgba(0, 0, 0, 0.04);

  &:focus {
    outline: 3px solid var(--color-text-${(p) => p.themestate});
    outline-offset: -6px;
  }

  ${hoverSupported(css`
    &:hover {
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1),
        0 2px 4px rgba(0, 0, 0, 0.06);
    }
  `)}
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
`;

function UpArrow({ theme, ...props }) {
  return (
    <ClickableWrapper {...props}>
      <Wrapper
        themestate={theme}
        initial={{ x: 72, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 72, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <IconContainer>
          <Image
            src={`/frontendmentor_17/up-arrow-${theme}-icon.svg`}
            alt={`${theme === 0 ? "light" : "dark"} theme up arrow image`}
          />
        </IconContainer>
      </Wrapper>
    </ClickableWrapper>
  );
}

export default UpArrow;
