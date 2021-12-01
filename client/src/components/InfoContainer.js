import React, { useState, useEffect } from 'react';
import InputWithLabel from './InputWithLabel';
import '../css/InfoContainer.css';
import { getCookie } from '../cookie.js';
import axios from 'axios';
import CustomButton from './CustomButton';
// import 'bootstrap/dist/css/bootstrap.min.css';

function InfoContainer() {
  const token = getCookie('myToken');

  const [info, setInfo] = useState({
    name: '',
    birth: '',
    phone: '',
    email: '',
  });

  async function loadInfo() {
    await axios
      .post('http://localhost:5000/api/mypage/info', {
        token: token,
      })
      .then((res) => {
        console.log('Info data: ' + res.data);
        setInfo({
          name: res.data.name,
          birth: res.data.birth,
          phone: res.data.phone,
          email: res.data.email,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    console.log('info: ' + token);
    // async function loadInfo() {
    //   await axios
    //     .post('http://localhost:5000/api/mypage/info', {
    //       token: token,
    //     })
    //     .then((res) => {
    //       console.log('Info data: ' + res.data);
    //       setInfo({
    //         name: res.data.name,
    //         birth: res.data.birth,
    //         phone: res.data.phone,
    //         email: res.data.email,
    //       });
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
    loadInfo();
  }, []);

  async function saveInfo() {
    console.log('email: ' + info.email);
    await axios
      .post('http://localhost:5000/api/mypage/saveInfo', {
        token: token,
        name: info.name,
        birth: info.birth,
        phone: info.phone,
        email: info.email,
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

  const onChangeName = (e) => {
    setInfo({
      ...info,
      name: e.target.value,
    });
    // setName(e.target.value);
  };
  const onChangeBirth = (e) => {
    setInfo({
      ...info,
      birth: e.target.value,
    });
    //setBirth(e.target.value);
  };
  const onChangePhone = (e) => {
    setInfo({
      ...info,
      phone: e.target.value,
    });
    //setPhone(e.target.value);
  };
  const onChangeEmail = (e) => {
    setInfo({
      ...info,
      email: e.target.value,
    });
    //setEmail(e.target.value);
  };

  return (
    <div className="info__container">
      <h1>Info</h1>
      <div className="userInfo__box">
        <InputWithLabel
          label="이름"
          onChange={onChangeName}
          name="username"
          autoComplete="off"
          value={info.name ? info.name : ''}
          placeholder="이름을 입력하세요"
        />
        <InputWithLabel
          label="생년월일"
          onChange={onChangeBirth}
          name="userbirth"
          autoComplete="off"
          value={info.birth ? info.birth : ''}
          placeholder="2021-01-01 형태로 입력하세요"
        />
        <InputWithLabel
          label="전화번호"
          onChange={onChangePhone}
          name="userphone"
          autoComplete="off"
          value={info.phone ? info.phone : ''}
          placeholder="전화번호를 입력하세요"
        />
        <InputWithLabel
          label="이메일"
          onChange={onChangeEmail}
          name="useremail"
          autoComplete="off"
          value={info.email ? info.email : ''}
          placeholder="이메일을 입력하세요"
        />
        <button type="submit" className="btn-submit" onClick={saveInfo}>
          저장하기
        </button>
      </div>
    </div>
  );
}

export default InfoContainer;
