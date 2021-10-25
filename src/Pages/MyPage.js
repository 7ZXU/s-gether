import React from 'react';
import UserBlock from '../Components/UserBlock';
import SelectMenu from '../Components/SelectMenu';
import Header from '../Components/Header';
import './MyPage.css';

function MyPage() {
  return (
    <>
      <Header />
      <div className="mypage-container">
        <div className="user-menu">
          <UserBlock></UserBlock>
          <SelectMenu></SelectMenu>
        </div>
        <div className="menu-detail"></div>
      </div>
    </>
  );
}

export default MyPage;
