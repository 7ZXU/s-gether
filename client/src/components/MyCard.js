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
import ChallengeFinishModal from './ChallengeFinishModal';

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];
function MyCard() {
  const [dataList, setdata] = useState([]);
  const token = getCookie('myToken');
  const [userId, setUserID] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [challengeModalOpen, setChallengeModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openChallengeModal = () => {
    setChallengeModalOpen(true);
  };

  const closeChallengeModal = () => {
    setChallengeModalOpen(false);
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
        setUserID(response['data']['userId']);
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
                const endDate = new Date(data.endDate);
                if (now < startDate) {
                  // 현재 날짜가 시작 날짜보다 이른 경우
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
                } else if (now >= startDate && now <= endDate) {
                  // 스터디 기간 중일 경우
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
                } else if (now > endDate) {
                  const dateIntervalMs =
                    endDate.getTime() - startDate.getTime();
                  const DateIntervalDay =
                    dateIntervalMs / (1000 * 60 * 60 * 24) + 1;
                  const penaltyFee = Math.ceil(data.fee / DateIntervalDay);
                  console.log(penaltyFee);
                  // 스터디 기간을 지났을 경우
                  // reward 안받은 애들만 불러온다.
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
                        onClick={openChallengeModal}
                      />
                      <ChallengeFinishModal
                        open={challengeModalOpen}
                        close={closeChallengeModal}
                        challengeId={data.id}
                        challengeName={data.name}
                        penaltyFee={penaltyFee}
                        userId={userId}
                      ></ChallengeFinishModal>
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
