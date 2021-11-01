import React, { useState } from 'react';
import './ChargeContainer.css';

function ChargeContainer() {
  const [money, setMoney] = useState(10000);
  const [history, setHistory] = useState({
    date: '2021.11.1',
    money: 10000,
  });

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
      </section>
    </div>
  );
}

export default ChargeContainer;
