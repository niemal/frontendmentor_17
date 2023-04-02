import styled from "styled-components";
import Input from "../Input";
import DropDown from "../DropDown";
import CardsRender from "../CardsRender";
import { QUERIES } from "../constants";

const Wrapper = styled.div`
  width: 100%;
  padding-top: 44px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  padding-left: 24px;
  padding-right: 24px;
  ${
    "" /* @media ${QUERIES.tabletAndSmaller} {
    padding-left: 24px;
    padding-right: 24px;
  } */
  }
`;

const TopContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  transition: all 0.3s ease-in-out;

  @media ${QUERIES.phoneAndSmaller} {
    flex-direction: column;
    gap: 32px;
    align-items: center;
  }
`;

function Home() {
  return (
    <Wrapper>
      <TopContainer>
        <Input />
        <DropDown />
      </TopContainer>
      <CardsRender />
    </Wrapper>
  );
}

export default Home;
