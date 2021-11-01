import React, { useState } from 'react';
import './PenaltyRewardContainer.css';

function PenaltyRewardContainer() {
  const [penalty, setPenalty] = useState(2000);
  const [reward, setReward] = useState(1000);

  return (
    <div className="penalty_reward__container">
      <section className="penalty__container">
        <h1>Penalty</h1>
        <div className="penalty__container">
          <div className="item clearfix">
            <label for="penalty" class="penalty__money">
              총 패널티:
            </label>
            <span>- {penalty} 원</span>
          </div>
          <div className="penalty__history"></div>
        </div>
      </section>
      <section className="reward__container">
        <h1>Reward</h1>
        <div className="reward__container ">
          <div className="item clearfix">
            <label for="reward" class="reward__money">
              총 상금:
            </label>
            <span>{reward} 원</span>
          </div>
          <div className="reward__history"></div>
        </div>
      </section>
    </div>
  );
}

export default PenaltyRewardContainer;
