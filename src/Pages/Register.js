import React from 'react';
import RegisterForm from '../Components/RegisterForm';
import box from '../img/box.png';
import logo from '../img/logo.png';
import './Register.css';

function Register() {
  return (
    <div className="container">
      <div className="Logo">
        <img className="box-img" src={box} alt="로고 박스" />
        <img className="check-img" src={logo} alt="체크 로고" />
      </div>
      <div className="login-form">
        <RegisterForm />
      </div>
    </div>
  );
}

export default Register;
