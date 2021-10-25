import React from 'react';
import UserBlock from '../Components/UserBlock';
import SelectMenu from '../Components/SelectMenu';
import './MyPage.css';

function MyPage() {
  return (
    <div className="mypage-container">
      <div className="user-menu">
        <UserBlock></UserBlock>
        <SelectMenu></SelectMenu>
      </div>
      <div className="menu-detail"></div>
    </div>
  );
}

export default MyPage;
