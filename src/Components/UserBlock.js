import React, { useState } from 'react';
import './UserBlock.css';
import test from '../img/example.jpg';

function UserBlock() {
  const [username, setUsername] = useState('사용자 이름');

  return (
    <div className="user-container-box">
      <div className="user-photo">
        <img src={test} alt="사용자 이미지" />
      </div>
      <div className="user-name">
        <p>{username}</p>
      </div>
    </div>
  );
}

export default UserBlock;
