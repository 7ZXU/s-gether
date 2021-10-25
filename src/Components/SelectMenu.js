import React from 'react';
import CustomButton from './CustomButton';

function SelectMenu() {
  return (
    <div className="menu-list-container">
      <div className="menu-list">
        <CustomButton>Info.</CustomButton>
        <CustomButton>Charge</CustomButton>
        <CustomButton>Penalty & Reward</CustomButton>
        <CustomButton>Setting</CustomButton>
      </div>
    </div>
  );
}

export default SelectMenu;
