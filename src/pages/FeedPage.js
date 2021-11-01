import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Calendar from '../components/Calendar';
import Friends from '../components/Friends';
import CheckboxList from '../components/CheckboxList';
import Slide from '../components/Slide';
// import Calendar from '../Components/Calendar';
// import Friends from '../Components/Friends';
// import CheckboxList from '../Components/CheckboxList';
// import Slide from '../Components/Slide';

const FeedWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 100px 100px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Body = styled.div`
  display: flex;
`;

const CalendarWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const User = styled.text`
  font-size: 50px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const CheckboxListWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const Login = styled(AccountCircleIcon)``;

function FeedPage() {
  const [user, setUser] = useState('김지수');

  return (
    <FeedWrap>
      <Header>
        <Friends />

        <Login sx={{ fontSize: 50 }}>login</Login>
      </Header>
      <Body>
        <CalendarWrap>
          <User>{user}</User>
          <Calendar></Calendar>
          <Link to="/feed/image">
            <Slide></Slide>
          </Link>
        </CalendarWrap>
        <CheckboxListWrap>
          <h1>Todo</h1>
          <CheckboxList />
        </CheckboxListWrap>
      </Body>
    </FeedWrap>
  );
}

export default FeedPage;
