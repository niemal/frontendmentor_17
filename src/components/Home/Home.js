import styled from "styled-components";
import Input from "../Input";
import DropDown from "../DropDown";
import CardsRender from "../CardsRender";
import { useRef, useCallback, forwardRef, useState, useEffect } from "react";
import { QUERIES } from "../constants";
import { ReactWindowScroller } from "react-window-scroller";

const Wrapper = styled.div`
  width: 100%;
  padding-top: 44px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  padding-left: 24px;
  padding-right: 24px;
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
    <ReactWindowScroller>
      {({ ref, outerRef, style, onScroll }) => (
        <Wrapper>
          <TopContainer>
            <Input />
            <DropDown />
          </TopContainer>
          <CardsRender
            scroller={{
              ref,
              outerRef,
              style,
              onScroll,
            }}
          />
        </Wrapper>
      )}
    </ReactWindowScroller>
  );
}

export default Home;
