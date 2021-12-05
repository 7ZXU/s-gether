import React from 'react';
import { MdAddCircle } from 'react-icons/md';
import '../css/ChallengeBack.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


const ChallengeBack = ({onInsertToggle, da, challengeId}) => {
  const [fileUrl, setFileUrl] = useState(null);

const [files, setfiles] = useState('');



const [imgSrc, setImgSrc] = useState('');

const [uploadFile, setUploadFile] = useState({
      file: null,
      fileName: null,
      });

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
      setUploadFile({
        file: evt.target.files[0],
        fileName: evt.target.value,
    });
  }else{
      setImgSrc('');
  }
}

const onHandleUpload = async () => {

  const user_id = 'snow'; //임시
  const challenge_id = challengeId;
  const formData = new FormData();

  formData.append('img', uploadFile.file);
  formData.append('challenge_id',challenge_id);
  formData.append('user_id',user_id);
  formData.append('challenge_date' , da);

  const url = "http://localhost:5000/api/certupload";
  const config = {
      headers: {
          'content-type': 'multipart/form-data',
      },
  };
  try {
    axios.post(url, formData, config)
  } catch (e) {
      console.error('[FAIL] POST ANSWER', e);
      return e;
  }
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
