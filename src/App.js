import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import styled from "styled-components";
import MovieSearch from "./MovieSearch";
import MovieList from "./MovieList";
import MovieDetail from "./MovieDetail";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Movielogo to="/">Movie App</Movielogo>
        <MovieSearch />
      </header>
      <Switch>
        <Route exact path="/" component={MovieList} />
        <Route path="/movie/:id" component={MovieDetail} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;

const NotFound = ({ location }) => (
  <OopsContainer>
    <img src={require("./oops.jpg")} alt="error" width="300" />
    <h2>
      No match for<code>{location.pathname}</code>
    </h2>
  </OopsContainer>
);

const Movielogo = styled(Link)`
  text-decoration: none !important;
  color: #fff !important;
`;

export const OopsContainer = styled.div`
  display: flex;
  height: calc(100vh - 70px);
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
