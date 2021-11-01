import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ChanllengePage from './pages/ChanllengePage';
import Main from './pages/Main';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import Register from './pages/Register';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/feed" component={FeedPage} />
        <Route exact path="/mypage" component={MyPage} />
        <Route exact path="/challenges" component={ChanllengePage} />
      </Switch>
    </div>
  );
}

export default App;
