import { useContext, forwardRef, useRef, useCallback, useEffect } from "react";
import styled from "styled-components";
import { MainContext } from "../MainBody";
import { motion, AnimatePresence } from "framer-motion";
import { NotFound } from "../Country";
import { QUERIES } from "../constants";
import { VariableSizeList as List } from "react-window";
import { FixedSizeList as FixedList } from "react-window";
import { isMobile } from "react-device-detect";
import { useMediaQuery } from "react-responsive";
import ClickableWrapper from "../ClickableWrapper";

const Wrapper = styled(motion.div)`
  height: max-content !important;
  padding: 0px 4px;
  padding-top: 16px;
  width: 100% !important;
  max-width: 1280px !important;
  max-height: max-content !important;
  margin: 0 auto;
  position: relative;

  &,
  & > div {
    display: flex;
    justify-content: space-between;
    ${"" /* gap: 32px; */}

    @media ${QUERIES.tabletAndSmaller} {
      justify-content: center;
    }
  }
`;

const MobileWrapper = styled(Wrapper)`
  display: none;

  @media ${QUERIES.phoneAndSmaller} {
    display: flex;
  }
`;

const CardWrapper = styled(motion.a)`
  text-decoration: none;
  position: relative !important;
  width: 260px !important;
  height: max-content !important;
  transition: all 0.3s ease-in-out;
  margin-bottom: 40px;

  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: var(--color-elements-${(p) => p["data-themestate"]});
  cursor: pointer;
  width: 260px;
  transition: all 0.3s ease-in-out;
  opacity: 1;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06),
    0 1px 2px rgba(0, 0, 0, 0.04);

  &:focus {
    outline: 3px solid var(--color-text-${(p) => p["data-themestate"]});
    outline-offset: 2px;
  }

  &:hover {
    transform: translateY(6px) !important;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1),
      0 2px 4px rgba(0, 0, 0, 0.06);
  }

  @media ${QUERIES.phoneAndSmaller} {
    max-height: 300px;
    position: absolute !important;
  }
`;

export const NoMatchesFound = styled.div`
  text-align: center;
  width: 100%;
  font-size: ${42 / 16}rem;
  line-height: ${48 / 16}rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-${(p) => p.themestate});
  transition: all 0.3s ease-in-out;
`;

const FlagContainer = styled.div`
  max-width: 100%;
  background-color: var(--color-elements-${(p) => p.themestate});
`;

const Image = styled.img`
  object-fit: cover;
  width: max(260px, 100%);
  height: 160px;
  border-radius: 8px 8px 0px 0px;
`;

const TextWrapper = styled.div`
  background-color: var(--color-elements-${(p) => p.themestate});
  padding: 32px 20px;
  border-radius: 0px 0px 8px 8px;
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const CountryName = styled.span`
  font-weight: var(--font-weight-extrabold);
  font-size: ${20 / 16}rem;
  line-height: ${22 / 16}rem;
  color: var(--color-text-${(p) => p.themestate});
  max-width: 240px;
`;

const TextRow = styled.div`
  ${(p) => (p.first ? "margin-top: 16px;" : "")}
  display: flex;
  gap: 8px;
`;

const TextRowIntro = styled.span`
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-${(p) => p.themestate});
`;

const TextRowValue = styled.span`
  color: var(--color-text-${(p) => p.themestate});
`;

export const fadeInOut = {
  initial: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      delay: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  transition: {
    duration: 0.5,
    ease: "easeInOut",
  },
};

export const fadeIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

function Row({
  index,
  data,
  columnIndex,
  rowIndex,
  style,
  setRowHeight,
  ...props
}) {
  const { items, theme } = data;
  const rowRef = useRef(null);
  const rowItems = [];
  let item;
  const tripleEntryRow = useMediaQuery({
    query: `(min-width: 500px) and (max-width: 1200px)`,
  });

  useEffect(() => {
    if (rowRef.current && !isMobile) {
      setRowHeight(index, rowRef.current.clientHeight);
    }
  }, [rowRef]);

  let marker = tripleEntryRow ? 3 : 4;

  if (columnIndex && rowIndex) {
    item = items[rowIndex * 4 + columnIndex];
  } else {
    item = items[index];

    if (!isMobile) {
      if (index % 4 !== 0) {
        return;
      }

      for (let i = index; i < index + marker && i < items.length; i++) {
        rowItems.push(items[i]);
      }
    }
  }

  if (!item) {
    return;
  }

  const encodedURI = encodeURI(`/frontendmentor_17/country/${item.name}`);

  if (!isMobile) {
    return (
      <Wrapper
        ref={rowRef}
        style={{
          ...style,
          zIndex: 1000 - index,
        }}
        animate={fadeInOut.animate}
        variants={fadeIn}
        initial={fadeInOut.initial}
        exit={fadeInOut.exit}
        transition={fadeInOut.transition}
        {...props}
      >
        {rowItems.map((item, id) => {
          const encodedURI = encodeURI(
            `/frontendmentor_17/country/${item.name}`
          );

          return (
            <ClickableWrapper
              key={`${item.name}${index}`}
              href={encodedURI}
              onClick={() => {
                window.location = encodedURI;
              }}
            >
              <CardWrapper
                key={`${item.name}${index}`}
                as={CardWrapper}
                themestate={theme}
                // style={{ ...style }}
              >
                <FlagContainer themestate={theme}>
                  <Image
                    src={item.flags.png}
                    alt={`${item ? item?.name : ""} search result flag image`}
                  />
                </FlagContainer>
                <TextWrapper themestate={theme}>
                  <CountryName themestate={theme}>{item.name}</CountryName>
                  <TextRow first={true}>
                    <TextRowIntro
                      themestate={theme}
                    >{`Population:`}</TextRowIntro>
                    <TextRowValue themestate={theme}>
                      {item.population
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </TextRowValue>
                  </TextRow>
                  <TextRow>
                    <TextRowIntro themestate={theme}>{`Region:`}</TextRowIntro>
                    <TextRowValue themestate={theme}>
                      {item.region}
                    </TextRowValue>
                  </TextRow>
                  <TextRow>
                    <TextRowIntro themestate={theme}>{`Capital:`}</TextRowIntro>
                    <TextRowValue themestate={theme}>
                      {item.capital}
                    </TextRowValue>
                  </TextRow>
                </TextWrapper>
              </CardWrapper>
            </ClickableWrapper>
          );
        })}
      </Wrapper>
    );
  }
  return (
    <MobileWrapper
      style={style}
      themestate={theme}
      initial={fadeInOut.initial}
      animate={fadeInOut.animate}
      variants={fadeIn}
      exit={fadeInOut.exit}
      transition={fadeInOut.transition}
    >
      <ClickableWrapper
        key={`${item.name}${index}`}
        href={encodedURI}
        onClick={() => {
          window.location = encodedURI;
        }}
      >
        <CardWrapper
          key={`${item.name}${index}`}
          layoutId={`card-${item.name}`}
          as={CardWrapper}
          themestate={theme}
        >
          <FlagContainer themestate={theme}>
            <Image
              src={item.flags.png}
              alt={`${item ? item?.name : ""} search result flag image`}
            />
          </FlagContainer>
          <TextWrapper themestate={theme}>
            <CountryName themestate={theme}>{item.name}</CountryName>
            <TextRow first={true}>
              <TextRowIntro themestate={theme}>{`Population:`}</TextRowIntro>
              <TextRowValue themestate={theme}>
                {item.population
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </TextRowValue>
            </TextRow>
            <TextRow>
              <TextRowIntro themestate={theme}>{`Region:`}</TextRowIntro>
              <TextRowValue themestate={theme}>{item.region}</TextRowValue>
            </TextRow>
            <TextRow>
              <TextRowIntro themestate={theme}>{`Capital:`}</TextRowIntro>
              <TextRowValue themestate={theme}>{item.capital}</TextRowValue>
            </TextRow>
          </TextWrapper>
        </CardWrapper>
      </ClickableWrapper>
    </MobileWrapper>
  );
}

const OuterElement = forwardRef((props, reactWindowRef) => {
  const localRef = useRef();

  const refSetter = (ref) => {
    reactWindowRef(ref);
    localRef.current = ref;
  };

  return <MobileWrapper ref={refSetter} {...props} />;
});

const OuterElementWrapper = forwardRef((props, reactWindowRef) => {
  const localRef = useRef();

  const refSetter = (ref) => {
    reactWindowRef(ref);
    localRef.current = ref;
  };

  return <Wrapper ref={refSetter} {...props} />;
});

const CardsRender = ({ scroller, ...props }) => {
  const rowHeights = useRef({});
  const { items, theme } = useContext(MainContext);
  const tripleEntryRow = useMediaQuery({
    query: `(min-width: 500px) and (max-width: 1200px)`,
  });

  const getRowHeight = useCallback((index) => {
    return rowHeights.current[index] || (isMobile ? 350 : 0);
  }, []);

  const setRowHeight = useCallback((index, size) => {
    scroller.ref.current?.resetAfterIndex(0);
    rowHeights.current = { ...rowHeights.current, [index]: size };
  }, []);

  if (items.length === 0) {
    return (
      <NotFound filter={true}>
        Sorry, no filter matches have been found...
      </NotFound>
    );
  }

  if (isMobile) {
    return (
      <AnimatePresence mode={"wait"}>
        <FixedList
          ref={scroller.ref}
          outerRef={scroller.outerRef}
          outerElementType={OuterElement}
          height={window.innerHeight}
          itemCount={items.length}
          itemSize={400}
          width={"100%"}
          itemData={{ items, theme }}
          style={scroller.style}
          onScroll={scroller.onScroll}
          {...props}
        >
          {Row}
        </FixedList>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode={"wait"}>
      <List
        ref={scroller.ref}
        outerRef={scroller.outerRef}
        outerElementType={OuterElementWrapper}
        height={window.innerHeight}
        itemCount={items.length}
        itemSize={(index) => getRowHeight(index)}
        width={tripleEntryRow ? window.innerWidth - 8 : 1280}
        itemData={{ items, theme }}
        style={scroller.style}
        onScroll={scroller.onScroll}
        {...props}
      >
        {({ index, ...props }) => {
          return <Row index={index} setRowHeight={setRowHeight} {...props} />;
        }}
      </List>
    </AnimatePresence>
  );
};

export default CardsRender;
