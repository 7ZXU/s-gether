import React, { useState, useEffect } from 'react';
import '../css/ChargeContainer.css';
import { getCookie } from '../cookie.js';
import Modal from './Modal';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

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

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // 현재 잔액 불러오기
  async function loadCurrentBalance() {
 
    // 쿠키가 없으면 로그인 페이지로 이동
    if (!token) {
      window.location.replace('/');
     
    } else {
      await axios
        .post('http://localhost:5000/api/mypage/currentBalance', {
          token: token,
        })
        .then((res) => {
 
          if (res.data.balance !== 0) {
            setMoney(res.data.balance);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // 잔액 내역 불러오기
  async function loadChargeHistory() {
    // 쿠키가 없으면 로그인 페이지로 이동
    if (!token) {
      window.location.replace('/');
     
    } else {
      await axios
        .post('http://localhost:5000/api/mypage/charge', {
          token: token,
        })
        .then((res) => {

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
    
        loadCurrentBalance();
        loadChargeHistory();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {

    loadChargeHistory();
    loadCurrentBalance();
  }, []);

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
          <Paper sx={{ overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 350 }}>
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
                  {history ? (
                    history
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
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
              rowsPerPageOptions={[5]}
              component="div"
              count={history.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </section>
    </div>
  );
}

export default ChargeContainer;
