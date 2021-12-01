import React, { useEffect, useState } from 'react';
import '../css/UserBlock.css';
import defaultUSer from '../assets/defaultUser.png';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { getCookie } from '../cookie.js';
import axios from 'axios';
import Modal from './Modal';

function UserBlock() {
  const [username, setUsername] = useState('');
  const [userImage, setUserImage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const token = getCookie('myToken');

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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
          console.log('이미지: ' + res.data.image);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    loadNickname();
  }, []);

  useEffect(() => {
    console.log('닉네임 변경');
  }, [username]);

  async function saveNickname(input) {
    await axios
      .post('http://localhost:5000/api/mypage/saveNickname', {
        token: token,
        nickname: input,
      })
      .then((res) => {
        console.log(res.data.result);
        if (res.status === 201) {
          console.log('저장 완료');
        } else {
          console.log('저장 실패');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onLoadImage = (e) => {
    if (e.target.files.length) {
      const imgTarget = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(imgTarget);
      fileReader.onload = function (e) {
        setUserImage(e.target.result);
      };
    } else {
      console.log('이미지추가');
    }
  };

  async function saveImage(input) {
    await axios.post('http:');
  }

  return (
    <div className="user-container-box">
      <div className="user-photo">
        <img src={userImage ? userImage : defaultUSer} alt="사용자 이미지" />
      </div>
      <input
        type="file"
        accept="image/jpg,impge/png,image/jpeg,image/gif"
        name="profile_img"
        onChange={onLoadImage}
      ></input>

      <div className="user-name">
        <p>{username}</p>
        <ModeEditIcon onClick={openModal} />
        <Modal
          open={modalOpen}
          close={closeModal}
          header="닉네임 변경"
          username={username}
          setValue={setUsername}
          saveValue={saveNickname}
        ></Modal>
      </div>
    </div>
  );
}

export default UserBlock;
