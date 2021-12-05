import React, { useEffect, useState } from 'react';
import '../css/PenaltyRewardContainer.css';
import { getCookie } from '../cookie.js';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

function PenaltyRewardContainer() {
  const [penaltyHistory, setPenaltyHistory] = useState('');
  const [rewardHistory, setRewardHistory] = useState('');

  const [penaltyPage, setPenaltyPage] = React.useState(0);
  const [penaltyRowsPerPage, setPenaltyRowsPerPage] = React.useState(3);

  const handlePenaltyChangePage = (event, newPage) => {
    setPenaltyPage(newPage);
  };

  const handlePenaltyChangeRowsPerPage = (event) => {
    setPenaltyRowsPerPage(+event.target.value);
    setPenaltyPage(0);
  };

  const [rewardsPage, setRewardsPage] = React.useState(0);
  const [rewardsRowsPerPage, setRewardsRowsPerPage] = React.useState(3);

  const handleRewardsChangePage = (event, newPage) => {
    setRewardsPage(newPage);
  };

  const handleRewardsChangeRowsPerPage = (event) => {
    setRewardsRowsPerPage(+event.target.value);
    setRewardsPage(0);
  };

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
        <div className="penalty__container__title">
          <h1>Penalty</h1>
          <span>총 패널티: {penaltyHistory ? calPenalty() : 0} 원</span>
        </div>

        <div className="penalty__container">
          <div className="penalty__history">
            <Paper sx={{ overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 300 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" sx={{ 'font-weight': 'bold' }}>
                        날짜
                      </TableCell>
                      <TableCell align="center" sx={{ 'font-weight': 'bold' }}>
                        금액
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {penaltyHistory ? (
                      penaltyHistory
                        .slice(
                          penaltyPage * penaltyRowsPerPage,
                          penaltyPage * penaltyRowsPerPage + penaltyRowsPerPage
                        )
                        .map((cur, index) => {
                          return (
                            <TableRow
                              hover
                              tabIndex={-1}
                              role="checkbox"
                              key={index}
                            >
                              <TableCell align="center" key="index">
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
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[3]}
                component="div"
                count={penaltyHistory.length}
                rowsPerPage={penaltyRowsPerPage}
                page={penaltyPage}
                onPageChange={handlePenaltyChangePage}
                onRowsPerPageChange={handlePenaltyChangeRowsPerPage}
              />
            </Paper>
          </div>
        </div>
      </section>
      <section className="reward__container">
        <div className="reward__container__title">
          <h1>Reward</h1>
          <span>총 상금: {rewardHistory ? calRewards() : 0} 원</span>
        </div>
        <div className="reward__history">
          <Paper sx={{ overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 300 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ 'font-weight': 'bold' }}>
                      날짜
                    </TableCell>
                    <TableCell align="center" sx={{ 'font-weight': 'bold' }}>
                      금액
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rewardHistory ? (
                    rewardHistory
                      .slice(
                        rewardsPage * rewardsRowsPerPage,
                        rewardsPage * rewardsRowsPerPage + rewardsRowsPerPage
                      )
                      .map((cur, index) => {
                        return (
                          <TableRow
                            hover
                            tabIndex={-1}
                            role="checkbox"
                            key={index}
                          >
                            <TableCell align="center" key="index">
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
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[3]}
              component="div"
              count={rewardHistory.length}
              rowsPerPage={rewardsRowsPerPage}
              page={rewardsPage}
              onPageChange={handleRewardsChangePage}
              onRowsPerPageChange={handleRewardsChangeRowsPerPage}
            />
          </Paper>
        </div>
      </section>
    </div>
  );
}

export default PenaltyRewardContainer;
