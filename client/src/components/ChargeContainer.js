import React, { useState, useEffect } from 'react';
import '../css/ChargeContainer.css';
import { getCookie } from '../cookie.js';
import Modal from './Modal';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';

function ChargeContainer() {
  const [money, setMoney] = useState(0);
  const token = getCookie('myToken');
  const [history, setHistory] = useState('');

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // 잔액 불러오기
  async function loadCharge() {
    // 쿠키가 없으면 로그인 페이지로 이동
    if (!token) {
      window.location.replace('/');
      console.log('쿠키 없음');
    } else {
      await axios
        .post('http://localhost:5000/api/mypage/charge', {
          token: token,
        })
        .then((res) => {
          console.log(res.data.result);
          console.log(res.data.history);
          if (res.data.history.length !== 0) {
            setHistory(res.data.history);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // 충전하기
  async function charge(input) {
    await axios
      .post('http://localhost:5000/api/mypage/chargeMoney', {
        token: token,
        chargeMoney: input,
        currentBalance: money,
      })
      .then((res) => {
        console.log(res.data.result);
        loadCharge();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    console.log('charge: ' + token);
    loadCharge();
  }, []);

  useEffect(() => {
    if (history !== '' || history.length !== 0) {
      console.log('내역: ' + history[0].money);
      setMoney(history[history.length - 1].current_balance);
    } else {
      console.log('내역: ' + typeof history);
    }
  }, [history]);

  return (
    <div className="charge__container ">
      <section className="charge__remain__container">
        <h1>Chrage</h1>
        <div className="money__container clearfix">
          <div className="left-item">
            <label for="money" class="remain__money">
              잔액:
            </label>
            <span>{money}</span>
          </div>
          <div className="right-item">
            <button type="button" className="btn-charge" onClick={openModal}>
              충전하기
            </button>
            <Modal
              open={modalOpen}
              close={closeModal}
              header="충전하기"
              placeholder="충전할 금액 입력"
              saveValue={charge}
              check="충전"
            ></Modal>
          </div>
        </div>
        <span className="explanation">
          * 현재 은행 연동을 지원하지 않습니다.
        </span>
      </section>

      <section className="history__container">
        <h1>Charge History</h1>
        <div className="table__container">
          <Table className="charge_history_table">
            <TableHead>
              <TableRow>
                <TableCell align="center">날짜</TableCell>
                <TableCell align="center">금액</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history ? (
                history.map((cur, index) => {
                  return (
                    <TableRow
                      key={index}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell align="center">
                        {cur.transaction_date}
                      </TableCell>
                      <TableCell align="center">{cur.money}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <p>내역 불러오는 중...</p>
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}

export default ChargeContainer;
