import React, { useState, useEffect } from 'react';
import '../css/ChargeContainer.css';
import { getCookie } from '../cookie.js';
import Modal from './Modal';
import axios from 'axios';

function ChargeContainer() {
  const [money, setMoney] = useState(0);
  const token = getCookie('myToken');
  const [history, setHistory] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [uploadImage, setUploadImage] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // 잔액 불러오기
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
        {history ? (
          history.map((cur, index) => {
            return (
              <p>
                날짜: {cur.transaction_date.slice(0, 10)} 금액: {cur.money}{' '}
                &nbsp;
              </p>
            );
          })
        ) : (
          <p>내역 불러오는 중...</p>
        )}
      </section>
    </div>
  );
}

export default ChargeContainer;
