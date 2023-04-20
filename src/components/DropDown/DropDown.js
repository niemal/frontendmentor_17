import { useContext, useEffect, useState, useRef, forwardRef } from "react";
import styled, { css } from "styled-components";
import { MainContext } from "../MainBody";
import { motion, AnimatePresence } from "framer-motion";
import { hoverSupported } from "../hoverSupported";
import ClickableWrapper from "../ClickableWrapper";

const Wrapper = styled.div`
  position: relative;
`;

const DropDownWrapper = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  background-color: var(--color-elements-${(p) => p.themestate});
  border: 2px solid transparent;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06),
    0 1px 2px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  position: relative;
  user-select: none;
  z-index: 89;

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

const DropDownSelectedText = styled.span`
  color: var(--color-text-${(p) => p.themestate});
  user-select: none;
`;

const DropDownIconContainer = styled.div`
  width: 17px;
  height: 17px;
  transition: all 0.3s ease-in-out;
  transform: rotate(45deg);

  ${(p) => (p.isOpen ? "transform: rotate(135deg);" : "")}
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
`;

const DropDownContainer = styled(
  forwardRef((props, ref) => <motion.div ref={ref} {...props} />)
)`
  position: absolute;
  top: 60px;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 12px 0px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1),
    0 2px 4px rgba(0, 0, 0, 0.06);
  gap: 4px;
  background-color: var(--color-elements-${(p) => p.themestate});
  width: 200px;
  border-radius: 8px;
  z-index: 88;
  overflow: hidden;
`;

const DropDownEntry = styled(motion.span)`
  width: 100%;
  cursor: pointer;
  user-select: none;
  padding: 8px 24px;
  transition: all 0.3s ease-in-out;

  ${
    "" /* color: ${({ "data-ishighlighted": isHighlighted, themestate }) =>
    isHighlighted === "true"
      ? `var(--color-background-${themestate})`
      : `var(--color-text-${themestate})`};

  background-color: ${({ "data-ishighlighted": isHighlighted, themestate }) =>
    isHighlighted === "true"
      ? `var(--color-input-${themestate})`
      : "transparent"}; */
  }

  color: ${(p) =>
    p.ishighlighted === "true"
      ? `var(--color-background-${p.themestate})`
      : `var(--color-text-${p.themestate})`};

  background-color: ${({ ishighlighted, themestate }) =>
    ishighlighted === "true"
      ? `var(--color-input-${themestate})`
      : "transparent"};

  border-radius: 8px 0px 0px 8px;

  &:focus {
    outline: 2px solid var(--color-text-${(p) => p.themestate});
    outline-offset: 2px;
  }

  ${hoverSupported(css`
    &:hover {
      color: var(--color-background-${(p) => p.themestate});
      background-color: var(--color-input-${(p) => p.themestate});
    }
  `)}
`;

const DropDownClear = styled(DropDownEntry)`
  width: max-content;
  padding: 8px 12px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06),
    0 1px 2px rgba(0, 0, 0, 0.04);
  background-color: var(--color-elements-${(p) => p.themestate});
  color: var(--color-text-${(p) => p.themestate});
  position: absolute;
  top: 8px;
  left: -72px;
  font-weight: var(--font-weight-semibold);
  border-radius: 8px;

  &:focus {
    outline: 2px solid var(--color-text-${(p) => p.themestate});
    outline-offset: 2px;
  }

  ${hoverSupported(css`
    &:hover {
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1),
        0 2px 4px rgba(0, 0, 0, 0.06);
    }
  `)}
`;

const selections = ["Africa", "America", "Asia", "Europe", "Oceania"];

function DropDown() {
  const { theme, region, setRegion } = useContext(MainContext);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const itemsRefs = useRef([]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setMenuIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setMenuIsOpen(!menuIsOpen);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((prevIndex) =>
        Math.min(prevIndex + 1, selections.length - 1)
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  const handleSelectionClick = (item) => {
    if (region === item) {
      setRegion(null);
    } else {
      setRegion(item);
    }

    setMenuIsOpen(false);
  };

  useEffect(() => {
    if (selectedIndex !== -1 && menuIsOpen) {
      itemsRefs.current[selectedIndex].focus();
    }
  }, [selectedIndex, menuIsOpen]);

  return (
    <Wrapper ref={wrapperRef}>
      <AnimatePresence>
        {region ? (
          <ClickableWrapper
            onClick={() => {
              setRegion(null);
              setSelectedIndex(-1);
            }}
            themestate={theme}
          >
            <DropDownClear
              initial={{ x: 72, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 72, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              Clear
            </DropDownClear>
          </ClickableWrapper>
        ) : (
          ""
        )}
      </AnimatePresence>
      <ClickableWrapper
        themestate={theme}
        onClick={() => setMenuIsOpen(!menuIsOpen)}
        onKeyDown={handleKeyDown}
      >
        <DropDownWrapper>
          <DropDownSelectedText themestate={theme}>
            {region ?? "Filter By Region"}
          </DropDownSelectedText>
          <DropDownIconContainer isOpen={menuIsOpen}>
            <Image
              src={`/frontendmentor_17/dropdown-${theme}-icon.svg`}
              alt={`${
                theme === 0 ? "light" : "dark"
              } theme dropdown image icon`}
            />
          </DropDownIconContainer>
          <AnimatePresence
            onExitComplete={() => {
              setMenuIsOpen(false);
            }}
          >
            {menuIsOpen && (
              <DropDownContainer
                initial={{ opacity: 0, maxHeight: 0, scale: 0.8 }}
                animate={{ opacity: 1, maxHeight: "260px", scale: 1 }}
                exit={{ opacity: 0, maxHeight: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                themestate={theme}
              >
                {selections.map((item, index) => (
                  <ClickableWrapper
                    key={`selection-entry-${index}`}
                    onClick={() => handleSelectionClick(item)}
                  >
                    <DropDownEntry
                      ref={(el) => (itemsRefs.current[index] = el)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                        delay: 0.15,
                      }}
                      // data-ishighlighted={(selectedIndex === index).toString()}
                      ishighlighted={(selectedIndex === index).toString()}
                      themestate={theme}
                      tabIndex={-1}
                    >
                      {item}
                    </DropDownEntry>
                  </ClickableWrapper>
                ))}
              </DropDownContainer>
            )}
          </AnimatePresence>
        </DropDownWrapper>
      </ClickableWrapper>
    </Wrapper>
  );
}

export default DropDown;
