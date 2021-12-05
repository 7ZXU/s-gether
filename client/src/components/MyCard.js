import React, { useState, useEffect } from 'react';
import Item from './item';
import Carousel from 'react-elastic-carousel';
import Typography from '@mui/material/Typography';
import studyBackground from '../assets/studyBackground.jpg';
import { getCookie } from '../cookie';
import jwt from 'jsonwebtoken';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/card.css';
import { formControlUnstyledClasses } from '@mui/core';
import SpecificItem from './specificItem';
import NoticeModal from './NoticeModal';

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];
function MyCard() {
  const [dataList, setdata] = useState([]);
  const token = getCookie('myToken');

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  async function callChallengeList() {
    console.log('call challenge');
    await axios
      .get('http://localhost:5000/api/getMyChallengeList', {
        params: {
          token: token,
        },
      })
      .then((response) => {
        setdata(response['data']['data']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    callChallengeList();
  }, []);

  // 데이터 값으로 변수 설정
  const now = new Date();

  if (dataList.length !== 0) {
    return (
      <div className="card">
        <Carousel breakPoints={breakPoints}>
          {dataList.length !== 0
            ? dataList.map((data, key) => {
                const url = `/myChallenge/:${data.id}`;
                const startDate = new Date(data.startDate);
                console.log(now < startDate ? '시작 전입니다.' : '시작가능');
                if (now < startDate) {
                  return (
                    <SpecificItem key={key}>
                      <img
                        className="studyBackground-img"
                        src={data['img']}
                        alt="card 사진"
                        heigth="200"
                        width="200"
                        align="center"
                        style={{ cursor: 'pointer' }}
                        onClick={openModal}
                      />
                      <NoticeModal
                        open={modalOpen}
                        close={closeModal}
                        setText="아직 스터디 시작 날짜가 아니에요 ^^"
                        check="확인"
                      ></NoticeModal>
                      <Typography variant="h6" component="div" align="center">
                        {data['name']}
                      </Typography>
                      <Typography variant="h6" component="div" align="center">
                        Date : {data['startDate'].split('T')[0]} ~{' '}
                        {data['endDate'].split('T')[0]}
                      </Typography>
                    </SpecificItem>
                  );
                } else {
                  return (
                    <SpecificItem key={key}>
                      <Link to={url}>
                        <img
                          className="studyBackground-img"
                          src={data['img']}
                          alt="card 사진"
                          heigth="200"
                          width="200"
                          align="center"
                        />
                      </Link>
                      <Typography variant="h6" component="div" align="center">
                        {data['name']}
                      </Typography>
                      <Typography variant="h6" component="div" align="center">
                        Date : {data['startDate'].split('T')[0]} ~{' '}
                        {data['endDate'].split('T')[0]}
                      </Typography>
                    </SpecificItem>
                  );
                }
              })
            : null}
        </Carousel>
      </div>
    );
  } else {
    return (
      <div className="card">
        <p>현재 참여중인 챌린지가 없습니다.</p>
      </div>
    );
  }
}

export default MyCard;
