import React, { useState } from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import '../css/SettingContainer.css';

function SettingContainer() {
  const [checked, setChecked] = useState([0]);

  return (
    <div className="setting__container">
      <h1>setting</h1>
      <form id="setting__form" action="#" method="post">
        <div class="form-group row">
          <label for="friend" class="col-sm-3 col-form-label">
            친구 요청 받기
          </label>
          <div class="col-sm-9">
            <ListItemIcon>
              <Checkbox edge="start" tabIndex={-1} disableRipple />
            </ListItemIcon>
          </div>
        </div>
        <div class="form-group row">
          <label for="id_search" class="col-sm-3 col-form-label">
            아이디 검색 허용
          </label>
          <div class="col-sm-9">
            <ListItemIcon>
              <Checkbox edge="start" tabIndex={-1} disableRipple />
            </ListItemIcon>
          </div>
        </div>
        <div class="form-group row">
          <label for="challenge" class="col-sm-3 col-form-label">
            나의 챌린지 공개
          </label>
          <div class="col-sm-9">
            <ListItemIcon>
              <Checkbox edge="start" tabIndex={-1} disableRipple />
            </ListItemIcon>
          </div>
        </div>
        <div class="form-group">
          <button type="submit" class="btn-submit">
            설정 저장
          </button>
        </div>
      </form>
    </div>
  );
}

export default SettingContainer;
