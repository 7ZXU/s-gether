import React, { useEffect, useState } from 'react';
import '../css/PenaltyRewardContainer.css';
import { getCookie } from '../cookie.js';
import axios from 'axios';

function PenaltyRewardContainer() {
  const [penaltyHistory, setPenaltyHistory] = useState('');
  const [rewardHistory, setRewardHistory] = useState('');

  const token = getCookie('myToken');

  // penalty & rewards 불러오기
  useEffect(() => {
    async function loadPenalty() {
      await axios
        .post('http://localhost:5000/api/mypage/penalty', {
          token: token,
        })
        .then((res) => {
          console.log(res.data.penalty);
          if (res.data.penalty !== 0) {
            setPenaltyHistory(res.data.penalty);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    async function loadRewards() {
      await axios
        .post('http://localhost:5000/api/mypage/rewards', {
          token: token,
        })
        .then((res) => {
          console.log(res.data.rewards);
          if (res.data.rewards !== 0) {
            setRewardHistory(res.data.rewards);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    loadRewards();
    loadPenalty();
  }, []);

  // penalty 총액 계산
  const calPenalty = () => {
    return penaltyHistory
      .map((item) => item.money)
      .reduce((currentTotal, nextScore, currentIndex) => {
        console.log('penalty index: ' + currentIndex);
        return currentTotal + nextScore;
      }, 0);
  };

  // rewards 총액 계산
  const calRewards = () => {
    return rewardHistory
      .map((item) => item.money)
      .reduce((currentTotal, nextScore, currentIndex) => {
        console.log('reward index: ' + currentIndex);
        return currentTotal + nextScore;
      }, 0);
  };

  return (
    <div className="penalty_reward__container">
      <section className="penalty__container">
        <h1>Penalty</h1>
        <div className="penalty__container">
          <div className="item clearfix">
            <label for="penalty" class="penalty__money">
              총 패널티:
            </label>
            <span>{penaltyHistory ? calPenalty() : 0} 원</span>
          </div>
          <div className="penalty__history">
            {penaltyHistory ? (
              penaltyHistory.map((cur, index) => {
                return (
                  <p>
                    날짜: {cur.transaction_date.slice(0, 10)} 금액: {cur.money}{' '}
                    원 &nbsp;
                  </p>
                );
              })
            ) : (
              <p>내역 불러오는 중...</p>
            )}
          </div>
        </div>
      </section>
      <section className="reward__container">
        <h1>Reward</h1>
        <div className="reward__container ">
          <div className="item clearfix">
            <label for="reward" class="reward__money">
              총 상금:
            </label>
            <span>{rewardHistory ? calRewards() : 0} 원</span>
          </div>
          <div className="reward__history">
            {rewardHistory ? (
              rewardHistory.map((cur, index) => {
                return (
                  <p>
                    날짜: {cur.transaction_date.slice(0, 10)} 금액: {cur.money}{' '}
                    원 &nbsp;
                  </p>
                );
              })
            ) : (
              <p>내역 불러오는 중...</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default PenaltyRewardContainer;
