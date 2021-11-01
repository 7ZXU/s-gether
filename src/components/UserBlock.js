import React, { useState } from 'react';
import './UserBlock.css';
import test from '../img/example.jpg';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

function UserBlock() {
  const [username, setUsername] = useState('닉네임');

  return (
    <div className="user-container-box">
      <div className="user-photo">
        <img src={test} alt="사용자 이미지" />
      </div>
      <div className="user-name">
        <p>{username}</p>
        <ModeEditIcon />
      </div>
    </div>
  );
}

export default UserBlock;
