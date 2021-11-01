import React from 'react';
import { MdAddCircle } from 'react-icons/md';
import '../css/Certcheck.css';

const Certcheck = ({ onInsertToggle2, img }) => {
  return (
    <div>
      <div className="Check" onClick={onInsertToggle2}></div>
      <form id="certcheck__form">
        <img className="image" src={img} alt="이미지" />
        <div className="font">확인 </div>
        <button className="yes">
          <MdAddCircle size="100" color="green" />
        </button>
        <button className="no">
          <MdAddCircle size="100" color="red" />
        </button>
      </form>
    </div>
  );
};

export default Certcheck;
