import React from 'react';
import { MdAddCircle } from 'react-icons/md';
import '../css/ChallengeBack.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


const ChallengeBack = ({onInsertToggle, da}) => {
  const [fileUrl, setFileUrl] = useState(null);

const [files, setfiles] = useState('');

const [imgSrc, setImgSrc] = useState('');

let time = new Date();
  let year = time.getFullYear;
  let day = time.getDay;
  let month = time.getMonth;




const onChangeHandle = (evt)=>{

  const imageFile = evt.target.files[0];
  const imageUrl = URL.createObjectURL(imageFile);
  setFileUrl(imageUrl);
  if(evt.target.files.length){
      const imgTarget = (evt.target.files)[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(imgTarget);
      fileReader.onload = function(e) {
        setImgSrc(e.target.result);
      }
  }else{
      setImgSrc('');
  }
}

const onHandleUpload = async () => {

  const user_id = 'snow'; //임시
  const challenge_id = 10;

  try {
      axios.post(`http://localhost:5000/api/certupload`, {
          params: {
              'img':imgSrc,
              'challenge_id':challenge_id,
              'user_id':user_id,
              'challenge_date' : da,
          }
      });
  } catch (e) {
      console.error('[FAIL] POST ANSWER', e);
      return e;
  }
}



  

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
          onChange={onChangeHandle}//&& onLoadFile () =>  
          //onChange={onLoadFile}
        ></input>
        <button className="subm" type="submit" onMouseDown={onHandleUpload}>
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
