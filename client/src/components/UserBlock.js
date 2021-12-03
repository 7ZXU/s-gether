import React, { useEffect, useState } from 'react';
import '../css/UserBlock.css';
import defaultUser from '../assets/defaultUser.png';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { getCookie } from '../cookie.js';
import axios from 'axios';
import Modal from './Modal';

function UserBlock() {
  const [username, setUsername] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [uploadFile, setUploadFile] = useState({
    file: null,
    fileName: null,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const token = getCookie('myToken');
  const [uploadImage, setUploadImage] = useState(false);

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
            setUserImage(res.data.image);
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

  // useEffect(() => {
  //   console.log('이미지 정보');
  //   console.log(uploadFile.file, uploadFile.fileName);
  // }, [uploadFile]);

  const onLoadImage = (e) => {
    if (e.target.files.length) {
      const imgTarget = e.target.files[0];
      setUploadFile({
        file: e.target.files[0],
        fileName: e.target.value,
      });
      console.log(e.target.files[0]);
      console.log('fileName: ' + e.target.value);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(imgTarget);
      fileReader.onload = function (e) {
        setUserImage(e.target.result);
        setUploadImage(true);
      };
      console.log('이미지 업로드');
    } else {
      console.log('이미지추가 x');
    }
  };

  function saveImage() {
    console.log('이미지 저장 호출');
    const url = 'http://localhost:5000/api/mypage/savePhoto';
    const formData = new FormData();
    formData.append('token', token);
    formData.append('image', uploadFile.file);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    if (uploadImage) {
      axios
        .post(url, formData, config)
        .then((res) => console.log(res.data.result));
    } else {
      console.log('이미지 안올림');
    }
  }

  return (
    <div className="user-container-box">
      <div className="user-photo">
        <label className="input-profile-img" for="input-file">
          <img src={userImage ? userImage : defaultUser} alt="사용자 이미지" />
        </label>
        <input
          type="file"
          id="input-file"
          accept="image/jpg,impge/png,image/jpeg,image/gif,image/png"
          name="profile_img"
          onChange={onLoadImage}
          style={{ display: 'none' }}
        ></input>
      </div>
      <SaveAltIcon className="save-icon" onClick={saveImage} />

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
