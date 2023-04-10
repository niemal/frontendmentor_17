import styled from "styled-components";
import { useState, createContext } from "react";
import NavBar from "../NavBar";
import { Switch, Route } from "wouter";
import Home from "../Home";
import Country from "../Country";
import baseData from "../../data.json";
import { NotFound } from "../Country";

const Wrapper = styled.main`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background-${(p) => p.themeState});
  /* overflow: hidden; */
`;

export const MainContext = createContext();

function MainBody() {
  const [theme, setTheme] = useState(0);
  const [items, setItems] = useState(baseData);
  const [region, setRegion] = useState(null);

  return (
    <Wrapper role={"main"} themeState={theme}>
      <MainContext.Provider
        value={{
          theme,
          setTheme,
          items,
          setItems,
          region,
          setRegion,
        }}
      >
        <NavBar />
        <Switch>
          <Route path={"/frontendmentor_17/"} component={Home} />
          <Route path={"/frontendmentor_17"} component={Home} />
          <Route path={"/frontendmentor_17/country/:country"}>
            {({ country }) => <Country country={country} />}
          </Route>
          <Route>
            <NotFound>
              🤔 404: The content you requested was not found. 💔
            </NotFound>
          </Route>
        </Switch>
      </MainContext.Provider>
    </Wrapper>
  );
}

export default MainBody;