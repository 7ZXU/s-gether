import React from 'react';
import LoginForm from '../Components/LoginForm';
import box from '../img/box.png';
import logo from '../img/logo.png';
import './Login.css';

function login() {
  return (
    <div className="container">
      <div className="Logo">
        <img className="box-img" src={box} alt="로고 박스" />
        <img className="check-img" src={logo} alt="체크 로고" />
      </div>
      <div className="login-form">
        <LoginForm />
      </div>
    </div>
  );
}

export default login;
