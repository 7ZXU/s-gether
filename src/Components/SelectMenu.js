import React from 'react';
import SelectedMenu from './Context';
import CustomButton from './CustomButton';

function SelectMenu() {
  return (
    <div className="menu-list-container">
      <div className="menu-list">
        <SelectedMenu.Provider value="Info">
          <CustomButton>Info.</CustomButton>
        </SelectedMenu.Provider>
        <SelectedMenu.Provider value="Charge">
          <CustomButton>Charge</CustomButton>
        </SelectedMenu.Provider>
        <SelectedMenu.Provider value="Penalty & Reward">
          <CustomButton>Penalty & Reward</CustomButton>
        </SelectedMenu.Provider>
        <SelectedMenu.Provider value="Setting">
          <CustomButton>Setting</CustomButton>
        </SelectedMenu.Provider>
      </div>
    </div>
  );
}

export default SelectMenu;
