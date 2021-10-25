import React from 'react';
import box from '../img/box.png';
import logo from '../img/logo.png';
import './Main.css';

function Main() {
  return (
    <>
      <img className="box-img" src={box} alt="로고 박스" />
      <img className="check-img" src={logo} alt="체크 로고" />
    </>
  );
}

export default Main;
