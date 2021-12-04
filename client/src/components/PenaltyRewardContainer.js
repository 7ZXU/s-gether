import React, { useEffect, useState } from 'react';
import '../css/PenaltyRewardContainer.css';
import { getCookie } from '../cookie.js';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

function PenaltyRewardContainer() {
  const [penaltyHistory, setPenaltyHistory] = useState('');
  const [rewardHistory, setRewardHistory] = useState('');

  const token = getCookie('myToken');

  // penalty 불러오기
  async function loadPenalty() {
    // 쿠키가 없으면 로그인 페이지로 이동
    if (!token) {
      window.location.replace('/');
      console.log('쿠키 없음');
    } else {
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
  }

  // rewards 불러오기
  async function loadRewards() {
    // 쿠키가 없으면 로그인 페이지로 이동
    if (!token) {
      window.location.replace('/');
      console.log('쿠키 없음');
    } else {
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
  }
  useEffect(() => {
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
            <Table className="penalty_history_table">
              <TableBody>
                {penaltyHistory ? (
                  penaltyHistory.map((cur, index) => {
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
            <Table className="reward_history_table">
              <TableBody>
                {rewardHistory ? (
                  rewardHistory.map((cur, index) => {
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
        </div>
      </section>
    </div>
  );
}

export default PenaltyRewardContainer;
