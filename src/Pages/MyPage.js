import React, { useState } from 'react';
import UserBlock from '../Components/UserBlock';
import Header from '../Components/Header';
import CustomButton from '../Components/CustomButton';
import '../css/MyPage.css';

function MyPage() {
  // const select = useContext(SelectedMenu);
  // console.log(select);
  const [selected, setSelected] = useState('Info');

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
        <div className="menu-detail">{selected}</div>
      </div>
    </>
  );
}

export default MyPage;
