import React, { useEffect, useState } from 'react';
import { getCookie } from '../cookie';
import '../css/ChallengeFinishModal.css';
import axios from 'axios';

function ChallengeFinishModal(props) {
  const {
    open,
    close,
    challengeId,
    challengeName,
    penaltyFee,
    userId,
    currentBalance,
  } = props;
  console.log(props);
  const [isWinner, setIsWinner] = useState(false);
  const [result, setResult] = useState({
    success: 0,
    fail: 0,
    rewards: 0,
  });
  const [receive, setReceive] = useState(false);
  const token = getCookie('myToken');

  console.log(`open: ${open}, ${currentBalance}`);
  console.log(userId);

  async function total() {
    console.log(`1. ${receive}`);
    console.log('1등 누군지 뽑기');
    let winnerNum = await axios
      .get('http://localhost:5000/api/getChallengeWinner', {
        params: {
          challengeId: challengeId,
        },
      })
      .then((res) => {
        console.log(res.data.result);
        console.log(res.data.winners);
        // 받은 배열에 본인이 속하는지 판단한다.
        res.data.winners.includes(userId)
          ? setIsWinner(true)
          : setIsWinner(false);
        return res.data.winners.length;
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(winnerNum);

    console.log(`2. ${receive}`);
    console.log('전체 패널티값 계산');
    let sumPenalty = await axios
      .get('http://localhost:5000/api/getChallengeTotalPenalty', {
        params: {
          challengeId: challengeId,
          penaltyFee: penaltyFee,
        },
      })
      .then((res) => {
        console.log(res.data.totalFee);
        return res.data.totalFee;
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(sumPenalty);

    console.log(`3. ${receive}`);
    console.log('전체 결과 불러오기');
    await axios
      .post('http://localhost:5000/api/getChallengeResult', {
        token: token,
        challengeId: challengeId,
        NumOfWinner: winnerNum,
        totalPenalty: sumPenalty,
      })
      .then((res) => {
        console.log(res.data.success, res.data.fail, res.data.rewards);
        setResult({
          success: res.data.success * penaltyFee,
          fail: res.data.fail * penaltyFee,
          rewards: res.data.rewards,
        });
        setReceive(true);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(`4. ${receive}`);

    console.log(`5. ${receive}`);
  }

  // 우승자일 경우, 우승자가 아닐 경우 구분 해야 함.
  async function saveData() {
    await axios
      .post('http://localhost:5000/api/saveFee', {
        token: token,
        challengeId: challengeId,
        returnFee: result.success,
        penalty: result.fail,
        rewards: result.rewards,
        isWinner: isWinner,
        currentBalance: currentBalance,
      })
      .then((res) => {
        console.log(res.data.result);
        close();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onClickClose = () => {
    close();
  };

  useEffect(() => {
    if (open) {
      total();
    }
  }, [open]);

  console.log(`챌린지 1회 패널티: ${penaltyFee}, 챌린지아이디: ${challengeId}`);

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {challengeName}
            <button className="close" onClick={close}>
              {' '}
              &times;{' '}
            </button>
          </header>
          <main>
            {receive ? (
              <div>
                <p style={{ fontSize: 16 }}>
                  {isWinner ? '우승자 입니다.' : '우승자가 아닙니다.'}&nbsp;
                </p>
                <p style={{ fontSize: 16 }}>
                  {receive ? `보증금 반환: ${result.success}` : ''}&nbsp;
                </p>
                <p style={{ fontSize: 16 }}>
                  {receive ? `패널티: ${result.fail}` : ''}&nbsp;
                </p>
                <p style={{ fontSize: 16 }}>
                  {receive && isWinner ? `상금: ${result.rewards}` : ''}&nbsp;
                </p>
              </div>
            ) : null}
          </main>
          <footer>
            <button className="close" onClick={saveData}>
              정산받기
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
}

export default ChallengeFinishModal;
