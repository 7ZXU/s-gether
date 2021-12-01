import React from 'react';
import { MdAddCircle } from 'react-icons/md';
import '../css/ChallengeBack.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ChallengeBack = (onInsertToggle) => {
  const [fileUrl, setFileUrl] = useState(null);

  function processImage(event) {
    console.log("-------------process---------------");
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setFileUrl(imageUrl);
    console.log("-------------onload---------------");
    const file = event.target.files;
    setfiles(file);

  }
const [files, setfiles] = useState('');
const handleclick = (e) =>{
  console.log("-------------upload---------------");
  const formdata = new FormData();
  const user_name = 'snow'; //임시
  const challenge_id = 10;
  const challenge_date = '2021-12-01';
  formdata.append('uploadImage', files[0]);

  const config = {
    Headers: {
      'content-type': 'multipart/form-data',
    },
  };
  axios.post('http://localhost:5000/api/certupload',challenge_id,formdata,config,user_name, challenge_date)
};

  

  return (
    <div>
      <div className="Background" onClick={() =>onInsertToggle}></div>
      <form id="challenge__back__form">
        사진 추가
        <img className="Presee" src={fileUrl} alt="추가사진" />
        <input
          type="file"
          accept="image/*"
          name="imgFile"
          id="imgFile"
          onChange={processImage}//&& onLoadFile () =>  
          //onChange={onLoadFile}
        ></input>
        <button className="subm" type="submit" onMouseOver={handleclick}>
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
