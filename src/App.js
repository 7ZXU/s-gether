<<<<<<< HEAD
import React from "react";
import {Route, Switch} from "react-router-dom";
import FeedPage from "./pages/FeedPage";
import MainPage from "./pages/MainPage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImagePage from "./pages/ImagePage";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={MainPage}/>
                <Route exact path="/feed" component={FeedPage}/>
                <Route exact path="/feed/image" component={ImagePage}/>
            </Switch>
        </div>
    );
=======
import './App.css';
import Main from './Pages/Main';
import Login from './Pages/Login';
import MyPage from './Pages/MyPage';
import Register from './Pages/Register';

function App() {
  return (
    <>
      <MyPage />
    </>
  );
>>>>>>> main
}

export default App;
