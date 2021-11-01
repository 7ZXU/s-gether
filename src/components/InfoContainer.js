import React, { useState } from 'react';
import CustomButton from './CustomButton';
import './InfoContainer.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

function InfoContainer() {
  // TODO: 상태관리? redux로 백엔드 연동했을 때 값 유지
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeBirth = (e) => {
    setBirth(e.target.value);
  };
  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
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
              value={name}
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
              value={birth}
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
              value={phone}
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
              value={email}
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
