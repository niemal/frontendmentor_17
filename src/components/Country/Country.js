import styled, { css } from "styled-components";
import baseData from "../../data.json";
import { NoMatchesFound, fadeInOut, fadeIn } from "../CardsRender";
import { useContext } from "react";
import { MainContext } from "../MainBody";
import { hoverSupported } from "../hoverSupported";
import { useHistory } from "./useHistory";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { QUERIES } from "../constants";
import ClickableWrapper from "../ClickableWrapper";

const Wrapper = styled(motion.div)`
  padding-top: 72px;
  gap: 72px;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  padding-left: 24px;
  padding-right: 24px;

  @media ${QUERIES.tabletAndSmaller} {
    padding-bottom: 32px;
  }

  @media ${QUERIES.phoneAndSmaller} {
    padding-top: 40px;
    padding-bottom: 40px;
  }
`;

const GoBackButton = styled.button`
  text-decoration: none;
  justify-self: start;
  display: flex;
  align-items: center;
  width: max-content;
  padding: 12px 40px;
  gap: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06),
    0 1px 2px rgba(0, 0, 0, 0.04);
  background-color: var(--color-elements-${(p) => p.themestate});
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  border-radius: 8px;

  &:focus {
    ${(p) =>
      p.isKeyboardFocused
        ? `
    outline: 3px solid var(--color-text-${p.themestate});
    outline-offset: 4px;
    `
        : ""}
  }

  ${hoverSupported(css`
    &:hover {
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1),
        0 2px 4px rgba(0, 0, 0, 0.06);
    }
  `)}
`;

const IconContainer = styled.div`
  width: 17px;
  height: 17px;
`;

const Image = styled.img`
  object-fit: cover;
  width: 17px;
  height: 17px;
`;

const ButtonText = styled.span`
  color: var(--color-text-${(p) => p.themestate});
`;

const getCountryNameByAlpha3Code = (alpha3Code) => {
  const country = baseData.find((item) => item.alpha3Code === alpha3Code);
  return country ? country.name : null;
};

const validateCountry = (country) => {
  const decodedCountry = decodeURIComponent(country);
  const lowerCaseCountry = decodedCountry?.toLowerCase();

  for (let item of baseData) {
    if (item.name.toLowerCase() === lowerCaseCountry) {
      const border_names =
        item.borders && item.borders.length > 0
          ? item.borders.map(getCountryNameByAlpha3Code)
          : [];
      return { ...item, border_names };
    }
  }

  return false;
};

export const NotFound = ({ children, filter }) => {
  const { theme } = useContext(MainContext);
  const { goBack } = useHistory();

  return (
    <AnimatePresence mode={"wait"}>
      <Wrapper
        key={`${filter}-notfound-wrapper`}
        initial={fadeInOut.initial}
        animate={fadeInOut.animate}
        themestate={theme}
        variants={fadeIn}
        exit={fadeInOut.exit}
        transition={fadeInOut.transition}
      >
        {!filter && (
          <ClickableWrapper themestate={theme} onClick={goBack}>
            <GoBackButton>
              <IconContainer>
                <Image
                  src={`/frontendmentor_17/arrow-${theme}-icon.svg`}
                  alt={`${theme === 0 ? "light" : "dark"} go back icon image`}
                />
              </IconContainer>
              <ButtonText themestate={theme}>Back</ButtonText>
            </GoBackButton>
          </ClickableWrapper>
        )}
        <NoMatchesFound themestate={theme}>{children}</NoMatchesFound>
      </Wrapper>
    </AnimatePresence>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media ${QUERIES.exclusiveWidth1} {
    gap: 32px;
  }

  @media ${QUERIES.tabletAndSmaller} {
    flex-direction: column;
    gap: 32px;
  }
`;

const BigFlagImage = styled.img`
  object-fit: cover;
  width: 520px;
  height: 420px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1),
    0 2px 4px rgba(0, 0, 0, 0.06);
  border-radius: 8px;

  @media ${QUERIES.phoneAndSmaller} {
    width: 350px;
    height: 270px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: min(644px, 100%);
`;

const CountryName = styled.h1`
  font-weight: var(--font-weight-extrabold);
  font-size: ${28 / 16}rem;
  color: var(--color-text-${(p) => p.themestate});

  @media ${QUERIES.tabletAndSmaller} {
    align-self: center;
  }
`;

const RowsWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 310px);
  gap: 12px;

  @media ${QUERIES.phoneAndSmaller} {
    grid-template-columns: repeat(auto-fit, 100%);
  }
`;

const Row = styled.div`
  display: flex;
  gap: 8px;

  @media ${QUERIES.phoneAndSmaller} {
    ${(p) => (p.topLevelDomain ? "margin-top: 16px;" : "")}
  }
`;

const RowIntro = styled.span`
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-${(p) => p.themestate});
`;

const RowValue = styled.span`
  color: var(--color-text-${(p) => p.themestate});
`;

const BordersRow = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
`;

const BorderLink = styled.a`
  ${(p) => (p.first ? "margin-left: 8px;" : "")}
  text-align: center;
  text-decoration: none;
  padding: 8px;
  min-width: 120px;
  background-color: var(--color-elements-${(p) => p.themestate});
  color: var(--color-text-${(p) => p.themestate});
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06),
    0 1px 2px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease-in-out;

  &:focus {
    ${(p) =>
      p.isKeyboardFocused
        ? `
      outline: 3px solid var(--color-text-${p.themestate});
      outline-offset: -3px;
    `
        : ""}
  }

  ${hoverSupported(css`
    &:hover {
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1),
        0 2px 4px rgba(0, 0, 0, 0.06);
    }
  `)}

  @media ${QUERIES.phoneAndSmaller} {
    min-width: 80px;
  }
`;

function Country({ country }) {
  const { theme } = useContext(MainContext);
  const { goBack } = useHistory();

  if (!country) {
    return null;
  }

  const item = validateCountry(country);

  if (!item) {
    return (
      <NotFound>Sorry, the country you requested could not be found.</NotFound>
    );
  }

  return (
    <AnimatePresence mode={"wait"}>
      <Wrapper
        key={`${item.name}-country-wrapper`}
        initial={fadeInOut.initial}
        animate={fadeInOut.animate}
        themestate={theme}
        variants={fadeIn}
        exit={fadeInOut.exit}
        transition={fadeInOut.transition}
      >
        <ClickableWrapper themestate={theme} onClick={goBack}>
          <GoBackButton>
            <IconContainer>
              <Image
                src={`/frontendmentor_17/arrow-${theme}-icon.svg`}
                alt={`${theme === 0 ? "light" : "dark"} go back icon image`}
              />
            </IconContainer>
            <ButtonText themestate={theme}>Back</ButtonText>
          </GoBackButton>
        </ClickableWrapper>

        <Container>
          <BigFlagImage src={item.flags.svg} alt={`${item.name} flag image`} />

          <InfoContainer>
            <CountryName themestate={theme}>{item.name}</CountryName>

            <RowsWrapper>
              <Row>
                <RowIntro themestate={theme}>{`Native Name:`}</RowIntro>
                <RowValue themestate={theme}>{item.nativeName}</RowValue>
              </Row>
              <Row>
                <RowIntro themestate={theme}>{`Population:`}</RowIntro>
                <RowValue themestate={theme}>
                  {item.population
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </RowValue>
              </Row>
              <Row>
                <RowIntro themestate={theme}>{`Region:`}</RowIntro>
                <RowValue themestate={theme}>{item.region}</RowValue>
              </Row>
              <Row>
                <RowIntro themestate={theme}>{`Sub Region:`}</RowIntro>
                <RowValue themestate={theme}>{item.subregion}</RowValue>
              </Row>
              <Row>
                <RowIntro themestate={theme}>{`Capital:`}</RowIntro>
                <RowValue themestate={theme}>{item.capital}</RowValue>
              </Row>
              <Row topLevelDomain={true}>
                <RowIntro themestate={theme}>{`Top Level Domain:`}</RowIntro>
                {item.topLevelDomain.map((domain, idx) => (
                  <RowValue
                    key={`${item.name}-domain-${domain}`}
                    themestate={theme}
                  >
                    {domain}
                    {idx < item.topLevelDomain.length - 1 ? "," : ""}
                  </RowValue>
                ))}
              </Row>
              <Row>
                <RowIntro themestate={theme}>{`Currencies:`}</RowIntro>
                {item.currencies.map((currency, idx) => (
                  <RowValue
                    key={`${item.name}-currency-${currency.name}`}
                    themestate={theme}
                  >
                    {currency.name}
                    {` `}
                    {currency.symbol}
                    {idx < item.currencies.length - 1 ? "," : ""}
                  </RowValue>
                ))}
              </Row>
              <Row>
                <RowIntro themestate={theme}>{`Languages:`}</RowIntro>
                {item.languages.map((lang, idx) => (
                  <RowValue
                    key={`${item.name}-lang-${lang.name}`}
                    themestate={theme}
                  >
                    {lang.name}
                    {idx < item.languages.length - 1 ? "," : ""}
                  </RowValue>
                ))}
              </Row>
            </RowsWrapper>

            {item.border_names && item.border_names.length > 0 ? (
              <BordersRow>
                <RowIntro themestate={theme}>{`Border countries:`}</RowIntro>
                {item.border_names.map((name) => (
                  <Link
                    key={`border-${name}`}
                    href={`/frontendmentor_17/country/${name}`}
                  >
                    <ClickableWrapper
                      onClick={() => {
                        window.location = `/frontendmentor_17/country/${name}`;
                      }}
                    >
                      <BorderLink themestate={theme}>{name}</BorderLink>
                    </ClickableWrapper>
                  </Link>
                ))}
              </BordersRow>
            ) : (
              ""
            )}
          </InfoContainer>
        </Container>
      </Wrapper>
    </AnimatePresence>
  );
}

export default Country;
