import React from 'react';
import box from '../assets/box.png';
import logo from '../assets/logo.png';
import '../css/Main.css';
import Login from './Login';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Main() {
  return (
    <div className="main__container">
      <img className="box-img" src={box} alt="로고 박스" />
      <img className="check-img" src={logo} alt="체크 로고" />

      <div className="button__container">
        <h1>함께 목표를 이루어봅시다!</h1>
        <Link to="./Login">
          <button className="join">이용하러 가기</button>
        </Link>
      </div>
    </div>
  );
}

export default Main;
