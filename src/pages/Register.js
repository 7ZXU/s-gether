import React from 'react';
import RegisterForm from '../components/RegisterForm';
import box from '../img/box.png';
import logo from '../img/logo.png';
import './Register.css';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="container">
      <div className="Logo">
        <img className="box-img" src={box} alt="로고 박스" />
        <img className="check-img" src={logo} alt="체크 로고" />
      </div>
      <div className="register-form">
        <h1>Create Account</h1>
        <RegisterForm to="./" />
        <Link to="./Login" className="link__login">
          로그인 하기
        </Link>
      </div>
    </div>
  );
}

export default Register;
