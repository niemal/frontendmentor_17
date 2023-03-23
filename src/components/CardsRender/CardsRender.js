import { useContext } from "react";
import styled from "styled-components";
import { Link } from "wouter";
import { MainContext } from "../MainBody";
import { motion, AnimatePresence } from "framer-motion";
import { NotFound } from "../Country";
import { QUERIES } from "../constants";
import { FixedSizeList as List } from "react-window";
import { isMobile } from "react-device-detect";

const Wrapper = styled.div`
  padding-top: 16px;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, 260px);
  justify-content: space-between;
  grid-gap: 32px;

  @media ${QUERIES.tabletAndSmaller} {
    justify-content: center;
  }

  @media ${QUERIES.phoneAndSmaller} {
    display: none;
  }
`;

const MobileWrapper = styled(Wrapper)`
  display: none;

  @media ${QUERIES.phoneAndSmaller} {
    display: grid;
  }
`;

const CardWrapper = styled(motion.a)`
  text-decoration: none;
  width: 260px;
  height: max-content;
  transition: all 0.3s ease-in-out;
  margin-bottom: 40px;

  /* & > div { */
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: var(--color-elements-${(p) => p.themestate});
  cursor: pointer;
  width: 260px;
  transition: all 0.3s ease-in-out;
  opacity: 1;
  /* } */

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06),
    0 1px 2px rgba(0, 0, 0, 0.04);

  &:hover {
    transform: translateY(6px) !important;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1),
      0 2px 4px rgba(0, 0, 0, 0.06);
  }

  @media ${QUERIES.phoneAndSmaller} {
    max-height: 300px;
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

function Row({ index, data, style }) {
  const { items, theme } = data;
  const item = items[index];

  return (
    <Link
      key={`${item.name}${index}`}
      href={`/frontendmentor_17/country/${item.name}`}
    >
      <CardWrapper
        key={`${item.name}${index}`}
        layoutId={`card-${item.name}`}
        as={CardWrapper}
        initial={fadeInOut.initial}
        animate={fadeInOut.animate}
        themestate={theme}
        variants={fadeIn}
        exit={fadeInOut.exit}
        transition={fadeInOut.transition}
        style={style}
      >
        <FlagContainer>
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
              {item.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
    </Link>
  );
}

function CardsRender() {
  const { items, theme } = useContext(MainContext);

  if (items.length === 0) {
    return (
      <NotFound filter={true}>
        Sorry, no filter matches have been found...
      </NotFound>
    );
  }

  if (isMobile) {
    return (
      <MobileWrapper>
        <AnimatePresence mode={"wait"}>
          <List
            height={window.innerHeight}
            itemCount={items.length}
            itemSize={400}
            width={"100%"}
            itemData={{ items, theme }}
          >
            {Row}
          </List>
        </AnimatePresence>
      </MobileWrapper>
    );
  }

  return (
    <Wrapper>
      <AnimatePresence mode={"wait"}>
        {items.map((item, index) => (
          <Link
            key={`${item.name}${index}`}
            href={`/frontendmentor_17/country/${item.name}`}
          >
            {/* <CardWrapper themestate={theme}> */}
            <CardWrapper
              key={`${item.name}${index}`}
              layoutId={`card-${item.name}`}
              as={CardWrapper}
              initial={fadeInOut.initial}
              animate={fadeInOut.animate}
              themestate={theme}
              variants={fadeIn}
              exit={fadeInOut.exit}
              transition={fadeInOut.transition}
            >
              <FlagContainer>
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
                  <TextRowValue themestate={theme}>{item.region}</TextRowValue>
                </TextRow>
                <TextRow>
                  <TextRowIntro themestate={theme}>{`Capital:`}</TextRowIntro>
                  <TextRowValue themestate={theme}>{item.capital}</TextRowValue>
                </TextRow>
              </TextWrapper>
            </CardWrapper>
            {/* </CardWrapper> */}
          </Link>
        ))}
      </AnimatePresence>
    </Wrapper>
  );
}

export default CardsRender;
