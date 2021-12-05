import React from 'react';
import '../css/ChallengeCert.css';
import { useState, useEffect } from 'react';
import { MdAddCircle } from 'react-icons/md';
import ChallengeBack from './ChallengeBack';
import Certcheck from './Certcheck';
import { ImageList } from '@mui/material';
import { ImageListItem } from '@mui/material';
import { getCookie } from '../cookie';
import axios from 'axios';
import styled from 'styled-components';



import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';

const Form = styled.form`
  margin-left: 10%;
  position: absolute;
  top: 20%;
  left: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 990;
  width: 1200px;
  height: 1000px;
  border-radius: 5px;
  box-shadow: 1px 2px 5px 1px black;

  background: white;
`;

const Cert = ({ Cday, cert, sday,t2,update}) => {
  const token = getCookie('myToken');



  const [insertToggle, setInsertToggle] = useState(false);
  const [insertToggle2, setInsertToggle2] = useState(false);

  const [itemData, setitemdata] = useState([]);
  const [allitemData, setallitemdata] = useState([
    {
      id: 1,
      img: img1,
      ischecked: 0,
      date: '2020-12-12'
    },
    {
      id: 2,
      img: img2,
      ischecked: 0,
      date: '2020-12-12'
    }
  ]);


  const [challenges, setchallenges] = useState([
    { id: 1, img: '', date: '2021-11-30', ischecked: 0},
  ]);
  
  useEffect(() => {
    async function loadData() {
      await axios
        .post('http://localhost:5000/api/challenge_ing_img', {
          token: token,
          challenge_id: 10, //실험용
        })
        .then((res) => {
          if(res.data.result === 'not ok'){
            console.log("no progress");
          }
          else{
            console.log(res.data.rows);
            setallitemdata(
              res.data.rows
            );
            //console.log(allitemData);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    loadData();
    console.log(t2);
  },[]);

  /*useEffect(() => {
    daycheck();
  });*/

  /*allitemData.map((all) => (
                  (all.date.substring(0,10) === sday.substring(0,10) ? itemData.push(all) : console.log(all.date.substring(0,10) +", "+sday)) //2021-11-29T15:00:00.000Z => e.target.date
                ))
                 */

  const daycheck = () => {
    setitemdata([]);
    allitemData.map((all) => (
      (all.date === sday ? itemData.push(all) :"")
    ))
    };



  const onInsertToggle = () => {
    setInsertToggle((prev) => !prev);
  };
  const onInsertToggle2 = () => {
    setInsertToggle2((prev) => !prev);
  };
  const [cimg, imgchange] = useState(img2);
  const onInsertImage = (inp) => {
    imgchange(inp.target.src);
  };
  const [imgid, setimgid] = useState(1);

  const onimgsetting = () => {
    setitemdata(
      itemData.map((item) =>
        item.id === imgid
          ? { ...item, ischecked: true, isgood: true }
          : { ...item, ischecked: true, isgood: true }
      )
    );
  };

  
const certupdate = () => {
  let cc = 1;

  try {
    axios.post('http://localhost:5000/api/cert', {
          challenge_id: 10, //실험용
          cert: cc,
          user_id: 'psy',//mate
          challenge_date: sday
        })
        .catch((err) => {
          console.log(err);
        })
  } catch (e) {
      console.error('[FAIL] POST ANSWER', e);
      return e;
  }
  };

  const certupdate2 = () => {
    let cc = 2;
  
    try {
      axios.post('http://localhost:5000/api/cert', {
            challenge_id: 10, //실험용
            cert: cc,
            user_id: 'psy',//mate
            challenge_date: sday
          })
          .catch((err) => {
            console.log(err);
          })
    } catch (e) {
        console.error('[FAIL] POST ANSWER', e);
        return e;
    }
    };
  return (
    <div className="ChallengeCerts">
      {!cert && (
        <div className="add-button" onClick={onInsertToggle}>
          <MdAddCircle />
        </div>
      )}
      {cert&& (
        <ImageList sx={{ width: 700, height: 200 }} cols={3} rowHeight={164}>
          {itemData && t2.map((item) => ( item.date === sday ?
            <ImageListItem key={item.img}>
              <img
                className="certimage"
                src={item.img}
                srcSet={item.img}
                onMouseOver={onInsertImage}
                onMouseDown={() => setimgid(item.id)}
                onClick={onInsertToggle2}
                alt="certimage"
              />
              <div className="indicater">
                {item.ischecked === 0 && <MdAddCircle size="45" color="yellow" />}
                {item.ischecked === 1 && (
                  <MdAddCircle size="45" color="green" />
                )}
                {item.ischecked === 2 && (
                  <MdAddCircle size="45" color="red" />
                )}
              </div>
            </ImageListItem>
          : ""))}
          <div className="add-button2" onClick={onInsertToggle}>
            <MdAddCircle />
          </div>
        </ImageList>
      )}
      {insertToggle && <ChallengeBack onInsertToggle={onInsertToggle} da={sday}/>}
      {insertToggle2 && (
        <div>
          <form id="challenge__cert__back"><div className="Check" onClick={onInsertToggle2}></div></form>
          <form id="challenge__cert__form">
            <img className="image" src={cimg} alt="img" />
            <div className="font">확인 </div>
            <button
              className="yes"
              onClick={onInsertToggle2}
              onMouseDown={certupdate}
              onMouseUp={update}
            >
              <MdAddCircle size="100" color="green" />
            </button>
            <button
              className="no"
              onClick={onInsertToggle2}
              onMouseDown={certupdate2}
              onMouseUp={update}
            >
              <MdAddCircle size="100" color="red" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Cert;
