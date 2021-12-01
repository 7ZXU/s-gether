import React, { useEffect, useState } from 'react';
import '../css/UserBlock.css';
import test from '../assets/example.jpg';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { getCookie } from '../cookie.js';
import axios from 'axios';

function UserBlock() {
  const [username, setUsername] = useState('');
  const token = getCookie('myToken');

  useEffect(() => {
    async function loadNickname() {
      await axios
        .post('http://localhost:5000/api/mypage/nickname', {
          token: token,
        })
        .then((res) => {
          if (res.data.nickname == null) {
            setUsername(res.data.id);
          } else {
            setUsername(res.data.nickname);
          }
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    loadNickname();
  }, []);

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
