import React from 'react';
import LoginForm from '../components/LoginForm';
import box from '../assets/box.png';
import logo from '../assets/logo.png';
import '../css/Login.css';
import { Link } from 'react-router-dom';
import Register from './Register.js';

function login() {
  return (
    <div className="container">
      <div className="Logo">
        <img className="box-img" src={box} alt="로고 박스" />
        <img className="check-img" src={logo} alt="체크 로고" />
      </div>
      <div className="login-form">
        <LoginForm to="./feed" />
        <Link to="./Register" className="link__register">
          아이디가 없으신가요?
        </Link>
      </div>
    </div>
  );
}

export default login;
