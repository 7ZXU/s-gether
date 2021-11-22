import React from 'react';
import { MdAddCircle } from 'react-icons/md';
import '../css/ChallengeBack.css';
import { useState } from 'react';

const ChallengeBack = (onInsertToggle) => {
  const [fileUrl, setFileUrl] = useState(null);

  function processImage(event) {
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setFileUrl(imageUrl);
  }

  return (
    <div>
      <div className="Background" onClick={onInsertToggle}></div>
      <form id="challenge__back__form">
        사진 추가
        <img className="Presee" src={fileUrl} alt="추가사진" />
        <input
          type="file"
          accept="image/*"
          name="imgFile"
          id="imgFile"
          onChange={processImage}
        ></input>
        <button className="subm" type="submit">
          <MdAddCircle size="80" color="black" />
          submit
        </button>
        <button className="cancel">
          <MdAddCircle size="80" color="red" />
          cancel
        </button>
      </form>
    </div>
  );
};

export default ChallengeBack;
