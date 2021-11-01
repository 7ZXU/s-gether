import React from "react";
import "../css/App.css";
import { Route, Switch } from "react-router-dom";
import FeedPage from "./pages/FeedPage";
import MainPage from "./pages/MainPage";

import ImagePage from "./pages/ImagePage";

import ChallengePage from "./pages/ChallengePage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/feed" component={FeedPage} />
        <Route exact path="/feed/image" component={ImagePage} />
        <Route exact path="/challenges" component={ChallengePage} />
      </Switch>
    </div>
  );
}

export default App;
