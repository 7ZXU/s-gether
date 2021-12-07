import React, { useEffect, useState } from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import '../css/SettingContainer.css';
import { getCookie } from '../cookie.js';
import axios from 'axios';

import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';

function SettingContainer() {
  const token = getCookie('myToken');
  const [checked, setChecked] = useState({
    permission_friend: false,
    permission_id: false,
    permission_challenge: false,
  });

  async function loadSetting() {
    // 쿠키가 없으면 로그인 페이지로 이동
    if (!token) {
      window.location.replace('/');
      
    } else {
      await axios
        .post('http://localhost:5000/api/mypage/setting', {
          token: token,
        })
        .then((res) => {
       
          setChecked({
            permission_friend: res.data.permission_friend === 1 ? true : false,
            permission_id: res.data.permission_id === 1 ? true : false,
            permission_challenge:
              res.data.permission_challenge === 1 ? true : false,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    loadSetting();
  }, []);

  useEffect(() => {
    
  }, [checked]);

  // 체크 박스 클릭 변경
  const check = (e) => {
   
    switch (e.target.tabIndex) {
      case 1:
    
        setChecked({
          permission_friend: !checked.permission_friend,
        });
        break;
      case 2:
       
        setChecked({
          ...checked,
          permission_id: !checked.permission_id,
        });
        break;
      case 3:
       
        setChecked({
          ...checked,
          permission_challenge: !checked.permission_challenge,
        });
        break;
      default:
        console.log('err');
    }
  };

  // 설정 저장
  async function saveSetting() {
  

    await axios
      .post('http://localhost:5000/api/mypage/saveSetting', {
        token: token,
        permission_friend: checked.permission_friend,
        permission_id: checked.permission_id,
        permission_challenge: checked.permission_challenge,
      })
      .then((res) => {
    
        loadSetting();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="setting__container">
      <h1>setting</h1>
      <Table className="penalty_history_table">
        <TableHead>
          <TableRow>
            <TableCell align="center">항목</TableCell>
            <TableCell align="center">선택</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
            }}
          >
            <TableCell align="center">친구 요청 받기</TableCell>
            <TableCell align="center">
              <Checkbox
                tabIndex={1}
                disableRipple
                checked={checked.permission_friend}
                onChange={check}
              />
            </TableCell>
          </TableRow>
          <TableRow
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
            }}
          >
            <TableCell align="center">아이디 검색 허용</TableCell>
            <TableCell align="center">
              <Checkbox
                tabIndex={2}
                disableRipple
                checked={checked.permission_id}
                onChange={check}
              />
            </TableCell>
          </TableRow>
          <TableRow
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
            }}
          >
            <TableCell align="center">챌린지 목록 공개</TableCell>
            <TableCell align="center">
              <Checkbox
                tabIndex={3}
                disableRipple
                checked={checked.permission_challenge}
                onChange={check}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div class="form-group clearfix">
        <button type="submit" class="btn-submit" onClick={saveSetting}>
          설정 저장
        </button>
      </div>
    </div>
  );
}

export default SettingContainer;
