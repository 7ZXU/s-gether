import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from './pages/Main';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import Register from './pages/Register';
import FeedPage from './pages/FeedPage';
import ImagePage from './pages/ImagePage';

import FriendPage from './pages/FriendPage';



function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/feed" component={FeedPage} />
        <Route exact path="/mypage" component={MyPage} />
        <Route exact path="/feed/image" component={ImagePage} />
        <Route exact path="/friendpage" component={FriendPage} />
      </Switch>
    </div>
  );
}

export default App;
