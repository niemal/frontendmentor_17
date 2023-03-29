import styled, { css } from "styled-components";
import { useContext, forwardRef, useEffect, useState, useMemo } from "react";
import { MainContext } from "../MainBody";
import { useCombobox } from "downshift";
import baseData from "../../data.json";
import { hoverSupported } from "../hoverSupported";
import { motion, AnimatePresence } from "framer-motion";
import { FixedSizeList as List } from "react-window";
import { QUERIES } from "../constants";
import { isMobile } from "react-device-detect";
import ClickableWrapper from "../ClickableWrapper";

const Wrapper = styled.div`
  position: relative;
  width: max-content;
`;

const InputElement = styled.input`
  border-radius: 8px;
  padding: 14px 28px;
  padding-left: 72px;
  font-size: ${14 / 16}rem;
  min-width: 480px;
  color: var(--color-text-${(p) => p.themestate});
  background-color: var(--color-elements-${(p) => p.themestate});
  outline: none;
  border: 2px solid transparent;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06),
    0 1px 2px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease-in-out;

  &:focus {
    border-color: var(--color-text-${(p) => p.themestate});
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1),
      0 2px 4px rgba(0, 0, 0, 0.06);
  }

  &::placeholder {
    color: var(--color-input-${(p) => p.themestate});
  }
  z-index: 88;
  position: relative;

  @media ${QUERIES.phoneAndSmaller} {
    min-width: 100%;
    z-index: 98;
  }
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;

  ${(p) =>
    p.flag
      ? `
  width: 120px;
  height: 80px;
  border-radius: 8px;
  `
      : ""}
`;

const SearchIconContainer = styled.div`
  position: absolute;
  left: 28px;
  top: 18px;
  width: 17px;
  height: 17px;
  transition: all 0.3s ease-in-out;
  z-index: 89;

  ${InputElement}:focus ~ & {
    transform: scale(1.4);
    left: 40px;
  }

  @media ${QUERIES.phoneAndSmaller} {
    z-index: 99;
  }
`;

const SearchResultsContainer = styled(motion.div)`
  position: absolute;
  left: 0;
  bottom: ${(p) =>
    p.filtereditems?.length === 1
      ? -144
      : p.filtereditems?.length > 1
      ? -262
      : 0}px;
  width: 482px;
  max-width: 482px;
  display: flex;
  flex-direction: column;
  max-height: 266px;
  overflow: auto;
  border-radius: 8px;
  /* border-left: 1px solid var(--color-text-${(p) => p.themestate}); */
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1),
    0 2px 4px rgba(0, 0, 0, 0.06);
  z-index: 87;
  transform-origin: top;

  @media ${QUERIES.phoneAndSmaller} {
    width: 100%;
    z-index: 97;
  }
`;

const FilterEntryWrapper = styled.div`
  padding: 24px 24px;
  transition: all 0.3s ease-in-out;
  background-color: var(--color-elements-${(p) => p.themestate});
  display: flex;
  gap: 24px;
  align-items: start;
  cursor: pointer;
  flex-wrap: nowrap;
  border-bottom: 1px solid var(--color-input-${(p) => p.themestate});

  ${hoverSupported(css`
    &:hover {
      background-color: var(--color-input-${(p) => p.themestate});
    }
  `)}

  @media ${QUERIES.phoneAndSmaller} {
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }
`;

const FilterEntryComponent = ({
  themestate,
  style,
  children,
  highlighted,
  selected,
  item,
  index,
  getItemProps,
  onFocus,
  onBlur,
  onKeyDown,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (highlighted) {
      setIsFocused(true);
    } else {
      setIsFocused(false);
    }
  }, [highlighted]);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus(index);
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur(index);
  };

  return (
    <FilterEntryWrapper
      {...getItemProps({ item, index })}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={onKeyDown}
      tabIndex={0}
      style={{
        ...style,
        backgroundColor: isFocused
          ? `var(--color-input-${themestate})`
          : `var(--color-elements-${themestate})`,
      }}
    >
      {children}
    </FilterEntryWrapper>
  );
};

const FilterEntryDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FilterEntryDetailsRow = styled.div`
  display: flex;
  gap: 8px;
`;

const FilterEntryDetailsIntro = styled.span`
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-${(p) => p.themestate});

  ${hoverSupported(css`
    ${FilterEntryWrapper}:hover & {
      color: var(--color-elements-${(p) => p.themestate});
    }
  `)}
`;

const FilterEntryDetailsValue = styled.span`
  color: var(--color-text-${(p) => p.themestate});

  ${hoverSupported(css`
    ${FilterEntryWrapper}:hover & {
      color: var(--color-elements-${(p) => p.themestate});
    }
  `)}
`;

function getCountriesFilter(inputValue) {
  const lowerCasedInputValue = inputValue.toLowerCase();

  return function countriesFilter(country) {
    return (
      !inputValue ||
      country.name.toLowerCase().includes(lowerCasedInputValue) ||
      country.alpha3Code.toLowerCase().includes(lowerCasedInputValue) ||
      country.alpha2Code.toLowerCase().includes(lowerCasedInputValue) ||
      country.subregion.toLowerCase().includes(lowerCasedInputValue) ||
      country.region.toLowerCase().includes(lowerCasedInputValue) ||
      country.nativeName.toLowerCase().includes(lowerCasedInputValue)
    );
  };
}

const MotionDiv = forwardRef((props, ref) => {
  const { style, ...rest } = props;
  return (
    <SearchResultsContainer
      ref={ref}
      style={{ ...style }}
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.5 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.3 }}
      {...rest}
    />
  );
});

function Input() {
  const { theme, items, setItems, region, data, setData } =
    useContext(MainContext);

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
    inputValue,
  } = useCombobox({
    items,
    itemToString(item) {
      return item ? item.name : "";
    },
  });

  const filteredItems = useMemo(() => {
    let tmp;
    if (!region) {
      // setData(baseData);
      tmp = baseData;
    } else {
      tmp = baseData.filter((country) => {
        const regionToLowerCase = region.toLowerCase();
        return country.region.toLowerCase().includes(regionToLowerCase);
      });
    }

    return tmp.filter(getCountriesFilter(inputValue));
  }, [inputValue, region]);

  const [isItemsEmpty, setIsItemsEmpty] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isArrowKeyPressed, setIsArrowKeyPressed] = useState(false);

  const handleFocus = (index) => {
    if (!isArrowKeyPressed) {
      setFocusedIndex(index);
    }
  };

  const handleBlur = (index) => {
    if (!isArrowKeyPressed) {
      setFocusedIndex(-1);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      setIsArrowKeyPressed(true);
      const nextIndex =
        event.key === "ArrowDown"
          ? Math.min(focusedIndex + 1, filteredItems.length - 1)
          : Math.max(focusedIndex - 1, 0);
      setFocusedIndex(nextIndex);
      event.preventDefault();
    } else if (event.key === "Enter" && focusedIndex >= 0) {
      getItemProps({
        item: items[focusedIndex],
        index: focusedIndex,
      }).onClick();
    } else if (event.key === "Tab") {
      event.preventDefault();
    } else {
      setIsArrowKeyPressed(false);
    }
  };

  useEffect(() => {
    setItems(filteredItems);
    setIsItemsEmpty(filteredItems.length === 0);
  }, [filteredItems]);
  useEffect(() => {
    setItems(filteredItems);
  }, [filteredItems]);

  return (
    <Wrapper>
      <InputElement
        aria-label={"search for a country"}
        themestate={theme}
        placeholder={"Search for a country..."}
        {...getInputProps({
          onKeyDown: (event) => {
            if (event.key === "Tab" && isOpen) {
              event.stopPropagation();
            }
          },
        })}
      />
      <SearchIconContainer>
        <Image
          src={`/frontendmentor_17/search-${theme}-icon.svg`}
          alt={"search icon image"}
        />
      </SearchIconContainer>
      <AnimatePresence>
        {isOpen && items.length ? (
          <SearchResultsContainer
            // key={items.length}
            aria-live={"polite"}
            aria-label={"search results"}
            themestate={theme}
            filtereditems={filteredItems}
            style={{ overflow: "hidden" }}
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.5 }}
            exit={
              isItemsEmpty
                ? { opacity: 0, scale: 0, y: -200 }
                : { opacity: 0, scale: 0 }
            }
            transition={{ duration: 0.3 }}
          >
            <List
              // key={items.length}
              height={filteredItems.length === 1 ? 144 : 286}
              itemCount={filteredItems.length}
              itemSize={isMobile ? 222 : 144}
              outerElementType={MotionDiv}
              innerElementType="div"
              itemData={filteredItems}
              themestate={theme}
              length={filteredItems.length}
              animate={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.5 }}
              exit={
                isItemsEmpty
                  ? { opacity: 0, scale: 0, y: 40 }
                  : { opacity: 0, scale: 0 }
              }
              transition={{ duration: 0.3 }}
              {...getMenuProps()}
            >
              {({ index, style }) => {
                const item = items[index];

                if (!item) {
                  return null;
                }

                return (
                  <FilterEntryComponent
                    themestate={theme}
                    key={`${item.name}-${index}`}
                    item={item}
                    index={index}
                    highlighted={highlightedIndex === index}
                    selected={selectedItem === index}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    style={style}
                    getItemProps={getItemProps}
                  >
                    <Image
                      flag={true}
                      src={item && item.flags ? item.flags.svg : ""}
                      alt={`${item ? item?.name : ""} search result flag image`}
                    />
                    <FilterEntryDetailsWrapper>
                      <FilterEntryDetailsRow>
                        <FilterEntryDetailsIntro
                          themestate={theme}
                        >{`Country:`}</FilterEntryDetailsIntro>
                        <FilterEntryDetailsValue themestate={theme}>
                          {item?.name}
                        </FilterEntryDetailsValue>
                      </FilterEntryDetailsRow>

                      <FilterEntryDetailsRow>
                        <FilterEntryDetailsIntro
                          themestate={theme}
                        >{`Capital:`}</FilterEntryDetailsIntro>
                        <FilterEntryDetailsValue themestate={theme}>
                          {item?.capital}
                        </FilterEntryDetailsValue>
                      </FilterEntryDetailsRow>
                    </FilterEntryDetailsWrapper>

                    <FilterEntryDetailsRow>
                      <FilterEntryDetailsIntro
                        themestate={theme}
                      >{`Region:`}</FilterEntryDetailsIntro>
                      <FilterEntryDetailsValue themestate={theme}>
                        {item?.region}
                      </FilterEntryDetailsValue>
                    </FilterEntryDetailsRow>
                  </FilterEntryComponent>
                );
              }}
            </List>
          </SearchResultsContainer>
        ) : (
          ""
        )}
      </AnimatePresence>
    </Wrapper>
  );
}

export default Input;
