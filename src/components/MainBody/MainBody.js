import styled from "styled-components";
import { useState, createContext, useEffect } from "react";
import NavBar from "../NavBar";
import { Switch, Route, Router } from "wouter";
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
  const [theme, setTheme] = useState(() => window.contextData?.theme || 0);
  const [items, setItems] = useState(
    () => window.contextData?.items || baseData
  );
  const [region, setRegion] = useState(
    () => window.contextData?.region || null
  );

  useEffect(() => {
    if (window.contextData) {
      setTheme(window.contextData.theme);
      setItems(window.contextData.items);
      setRegion(window.contextData.region);
      delete window.contextData;
    }
  }, []);

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
        <Router base={"/frontendmentor_17"}>
          <Switch>
            <Route path={"/"} component={Home} />
            <Route path={"/country/:country"}>
              {({ country }) => <Country country={country} />}
            </Route>
            <Route path={"/:anything*"}>
              <NotFound>
                🤔 404: The content you requested was not found. 💔
              </NotFound>
            </Route>
          </Switch>
        </Router>
      </MainContext.Provider>
    </Wrapper>
  );
}

export default MainBody;
