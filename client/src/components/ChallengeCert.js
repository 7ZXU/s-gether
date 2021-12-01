import React from 'react';
import '../css/ChallengeCert.css';
import { useState } from 'react';
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

const Cert = ({ Cday, cert }) => {
  /*const token = getCookie('myToken');

  useEffect(() => {
    console.log(token);
    async function loadData() {
      await axios
        .post('http://localhost:5000/api/challenge_ing', {
          token: token,
        })
        .then((res) => {
          const nickname = res.data.id;
          console.log(res.data);
          console.log(nickname);
          setUser(nickname);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    loadData();
  });*/


  const [insertToggle, setInsertToggle] = useState(false);
  const [insertToggle2, setInsertToggle2] = useState(false);
  const [itemData, setitemdata] = useState([
    {
      id: 1,
      img: img1,
      ischecked: false,
      isgood: false,
    },
    {
      id: 2,
      img: img2,
      ischecked: false,
      isgood: false,
    },
    {
      id: 3,
      img: img3,
      ischecked: false,
      isgood: false,
    },
    {
      id: 4,
      img: img4,
      ischecked: false,
      isgood: false,
    },
  ]);


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

  return (
    <div className="ChallengeCerts">
      {!cert && (
        <div className="add-button" onClick={onInsertToggle}>
          <MdAddCircle />
        </div>
      )}
      {cert && (
        <ImageList sx={{ width: 700, height: 200 }} cols={3} rowHeight={164}>
          {itemData.map((item) => (
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
                {!item.ischecked && <MdAddCircle size="45" color="yellow" />}
                {item.ischecked && item.isgood && (
                  <MdAddCircle size="45" color="green" />
                )}
                {item.ischecked && !item.isgood && (
                  <MdAddCircle size="45" color="red" />
                )}
              </div>
            </ImageListItem>
          ))}
          <div className="add-button2" onClick={onInsertToggle}>
            <MdAddCircle />
          </div>
        </ImageList>
      )}
      {insertToggle && <ChallengeBack onInsertToggle={onInsertToggle} />}
      {insertToggle2 && (
        <div>
          <div className="Check" onClick={onInsertToggle2}></div>
          <form>
            <img className="image" src={cimg} alt="img" />
            <div className="font">확인 </div>
            <button
              className="yes"
              onClick={onInsertToggle2}
              onMouseOver={() =>
                setitemdata(
                  itemData.map((item) =>
                    item.id === imgid
                      ? { ...item, ischecked: true, isgood: true }
                      : item
                  )
                )
              }
            >
              <MdAddCircle size="100" color="green" />
            </button>
            <button
              className="no"
              onClick={onInsertToggle2}
              onMouseOver={() =>
                setitemdata(
                  itemData.map((item) =>
                    item.id === imgid
                      ? { ...item, ischecked: true, isgood: false }
                      : item
                  )
                )
              }
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
