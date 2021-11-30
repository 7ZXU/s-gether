import React, {useState, useEffect} from 'react';
import Item from './item';
import Carousel from 'react-elastic-carousel';
import Typography from '@mui/material/Typography';
import studyBackground from '../assets/studyBackground.jpg';
import {setCookie, getCookie} from '../cookie';
import jwt from "jsonwebtoken";
import axios from 'axios';
import '../css/card.css';
import { formControlUnstyledClasses } from '@mui/core';
import SpecificItem from './specificItem';

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function MyCard() {
  const [dataList, setdata] = useState([]);
  const token = getCookie('myToken');
  useEffect(async  ()=>{
    await axios.get("http://localhost:5000/api/getMyChallengeList", {
      params : {
        token : token
      }
    })
    .then((response) => {
      console.log(response['data']['data'])
      setdata(response['data']['data'])
    })
    .catch((error) => {
      
      console.log(error);
    });
    
  },[])
  
  let card = dataList.map((data, key) => 
    <SpecificItem key = {key}>
      <img
        className="studyBackground-img"
        src={studyBackground}
        alt="card 사진"
        heigth="200"
        width="200"
        align="center"
      />
      <Typography variant="h6" component="div" align="center">
        {data['name']}
      </Typography>
      <Typography variant="h6" component="div" align="center">
        Date : {data['startDate'].split('T')[0]} ~ {data['endDate'].split('T')[0]}
      </Typography>
    </SpecificItem>
  );
  
  return (
    <div className="card">
      <Carousel breakPoints={breakPoints}>
        {card}
      </Carousel>
    </div>
  );
}

export default MyCard;
