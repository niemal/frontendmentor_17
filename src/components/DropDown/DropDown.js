import { useContext, useEffect, useState, useRef, forwardRef } from "react";
import styled, { css } from "styled-components";
import { useSelect } from "downshift";
import { MainContext } from "../MainBody";
import { motion, AnimatePresence } from "framer-motion";
import { hoverSupported } from "../hoverSupported";

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

  color: ${({ "data-ishighlighted": isHighlighted, themestate }) =>
    isHighlighted === "true"
      ? `var(--color-background-${themestate})`
      : `var(--color-text-${themestate})`};

  background-color: ${({ "data-ishighlighted": isHighlighted, themestate }) =>
    isHighlighted === "true"
      ? `var(--color-input-${themestate})`
      : "transparent"};

  border-radius: 8px 0px 0px 8px;

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
  box-shadow: 0px 1px 6px var(--color-text-${(p) => p.themestate});
  background-color: var(--color-elements-${(p) => p.themestate});
  color: var(--color-text-${(p) => p.themestate});
  position: absolute;
  top: 68px;
  left: 24px;
  font-weight: var(--font-weight-semibold);
  border-radius: 8px;
`;

const selections = ["Africa", "America", "Asia", "Europe", "Oceania"];

function DropDown() {
  const { theme, items, setItems, region, setRegion } = useContext(MainContext);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const {
    reset,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
  } = useSelect({
    items: selections,
  });

  const menuProps = getMenuProps({ refKey: "ref" }, { suppressRefError: true });

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

  useEffect(() => {
    setRegion(selectedItem);
  }, [selectedItem]);

  return (
    <Wrapper ref={wrapperRef}>
      <DropDownWrapper
        themestate={theme}
        {...getToggleButtonProps()}
        onClick={() => setMenuIsOpen(!menuIsOpen)}
      >
        <DropDownSelectedText themestate={theme}>
          {selectedItem ?? "Filter By Region"}
        </DropDownSelectedText>
        <DropDownIconContainer isOpen={menuIsOpen}>
          <Image
            src={`/frontendmentor_17/dropdown-${theme}-icon.svg`}
            alt={`${theme === 0 ? "light" : "dark"} theme dropdown image icon`}
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
              {...menuProps}
              // {...getMenuProps({ refKey: "ref" }, { suppressRefError: true })}
            >
              {selections.map((item, index) => {
                const { onClick, ...props } = getItemProps({ item, index });

                return (
                  <DropDownEntry
                    key={`selection-entry-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                      delay: 0.15,
                    }}
                    data-ishighlighted={(region === item).toString()}
                    themestate={theme}
                    onClick={(e) => {
                      onClick(e);

                      if (region && region === item) {
                        setRegion(null);
                        reset();
                      }
                    }}
                    {...props}
                  >
                    {item}
                  </DropDownEntry>
                );
              })}
            </DropDownContainer>
          )}
        </AnimatePresence>
      </DropDownWrapper>

      {/* <AnimatePresence>
        {selectedItem && (
          <DropDownClear
            key={"clear-button"}
            themestate={theme}
            initial={{ opacity: 0, maxHeight: "260px", scale: 0 }}
            animate={{ opacity: 1, maxHeight: "260px", scale: 1 }}
            exit={{ opacity: 0, maxHeight: "0px", scale: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={(e) => {
              e.preventDefault();
              reset();
              setMenuIsOpen(false);
              setRegion(null);
            }}
          >
            CLEAR
          </DropDownClear>
        )}
      </AnimatePresence> */}
    </Wrapper>
  );
}

export default DropDown;
