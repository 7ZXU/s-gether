import React, { useState, useEffect } from 'react';
import CustomButton from './CustomButton';
import '../css/InfoContainer.css';
import { getCookie } from '../cookie.js';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

function InfoContainer() {
  const token = getCookie('myToken');

  const [info, setInfo] = useState({
    name: '',
    birth: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    console.log('info: ' + token);
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
    loadInfo();
  }, []);

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
      <form id="info__form" action="#" method="post">
        <div class="form-group row">
          <label for="username" class="col-sm-3 col-form-label">
            이름:
          </label>
          <div class="col-sm-9">
            <input
              onChange={onChangeName}
              type="text"
              autoComplete="off"
              id="username"
              name="username"
              value={info.name ? info.name : ''}
              placeholder="이름을 입력하세요"
              class="form-control"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="birth" class="col-sm-3 col-form-label">
            생년월일:
          </label>
          <div class="col-sm-9">
            <input
              onChange={onChangeBirth}
              type="text"
              autoComplete="off"
              id="birth"
              name="birth"
              value={info.birth ? info.birth : ''}
              placeholder="생년월일을 입력하세요"
              class="form-control"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="phone" class="col-sm-3 col-form-label">
            전화번호:
          </label>
          <div class="col-sm-9">
            <input
              onChange={onChangePhone}
              type="text"
              autoComplete="off"
              id="phone"
              name="phone"
              value={info.phone ? info.phone : ''}
              placeholder="전화번호를 입력하세요"
              class="form-control"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="email" class="col-sm-3 col-form-label">
            E-mail:
          </label>
          <div class="col-sm-9">
            <input
              onChange={onChangeEmail}
              type="text"
              autoComplete="off"
              id="email"
              name="email"
              value={info.email ? info.email : ''}
              placeholder="이메일을 입력하세요"
              class="form-control"
            />
          </div>
        </div>
        <div class="form-group">
          <button type="submit" class="btn-submit">
            수정완료
          </button>
        </div>
      </form>
      {/* <form id="info-form" method="post" action="#">
        <ul>
          <li></li>
        </ul>
      </form> */}
    </div>
  );
}

export default InfoContainer;
