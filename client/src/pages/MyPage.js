import React, { useState } from 'react';
import UserBlock from '../components/UserBlock';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import InfoContainer from '../components/InfoContainer';
import ChargeContainer from '../components/ChargeContainer';
import PenaltyRewardContainer from '../components/PenaltyRewardContainer';
import SettingContainer from '../components/SettingContainer';
import { getCookie } from '../cookie';
import '../css/MyPage.css';

function MyPage() {
  const [selected, setSelected] = useState('Info');
  const token = getCookie('myToken');
  console.log('mypage: ' + token);

  const onClickInfo = () => setSelected('Info');
  const onClickCharge = () => setSelected('Charge');
  const onClickPenalty = () => setSelected('Penalty & Reward');
  const onClickSetting = () => setSelected('Setting');
  console.log(selected);

  return (
    <>
      <Header />
      <div className="mypage-container">
        <div className="user-menu">
          <UserBlock></UserBlock>
          <div className="menu-list">
            <CustomButton onClick={onClickInfo} value="Info">
              Info.
            </CustomButton>
            <CustomButton onClick={onClickCharge}>Charge</CustomButton>
            <CustomButton onClick={onClickPenalty}>
              Penalty & Reward
            </CustomButton>
            <CustomButton onClick={onClickSetting}>Setting</CustomButton>
          </div>
          {/* <SelectMenu></SelectMenu> */}
        </div>
        <div className="menu-detail">
          {(function () {
            switch (selected) {
              case 'Info':
                return <InfoContainer />;
              case 'Charge':
                return <ChargeContainer />;
              case 'Penalty & Reward':
                return <PenaltyRewardContainer />;
              case 'Setting':
                return <SettingContainer />;
              default:
                throw new Error('error');
            }
          })()}
        </div>
      </div>
    </>
  );
}

export default MyPage;
