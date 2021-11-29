import React, { useState, useEffect } from 'react';
import '../css/ChargeContainer.css';
import { getCookie } from '../cookie.js';
import axios from 'axios';

function ChargeContainer() {
  const [money, setMoney] = useState(0);
  const token = getCookie('myToken');

  const [history, setHistory] = useState('');

  useEffect(() => {
    console.log('charge: ' + token);
    async function loadCharge() {
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
            <button type="button" class="btn-charge">
              충전하기
            </button>
          </div>
        </div>
        <span className="explanation">
          * 현재 은행 연동을 지원하지 않으므로 가입 시 잔액을 10,000으로 설정
        </span>
      </section>

      <section className="history__container">
        <h1>Charge History</h1>
        {history
          ? history.map((cur, index) => {
              return (
                <p>
                  날짜: {cur.transaction_date} 금액: {cur.money} &nbsp;
                </p>
              );
            })
          : '내역 불러오는 중'}
      </section>
    </div>
  );
}

export default ChargeContainer;
