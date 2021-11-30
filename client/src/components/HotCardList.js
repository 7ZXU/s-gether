import React, {useEffect, useState} from 'react';
import SpecificItem from './specificItem';
import Carousel from 'react-elastic-carousel';
import Typography from '@mui/material/Typography';
import studyBackground from '../assets/studyBackground.jpg';
import '../css/hotCardList.css';
import axios from 'axios';
import card from './card';

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function HotCardList() {
  const [dataList, setdata] = useState([]);
 
  useEffect(async  ()=>{
    const response = axios
    .get("http://localhost:5000/api/getChallengeList", {
 
    })
    .then((response) => {
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
    <Typography variant="h5" component="div" align="center">
      {data['name']}
    </Typography>
    <Typography variant="h6" component="div" align="center">
      Date : {data['startDate'].split('T')[0]} ~ {data['endDate'].split('T')[0]}
    </Typography>
    <Typography variant="h6" component="div" align="center">
      People : 0/{data['max_participants']}
    </Typography>
    <Typography variant="h6" component="div" align="center">
      Point : {data['fee']}
    </Typography>
  </SpecificItem>
  );
  // const CardList = dataList.map((data) => cardTemplate(data));

  return (
    <div className="HotCardList">
      <Carousel breakPoints={breakPoints}>
          {card}
      </Carousel>
    </div>
  );
  
}

export default HotCardList;
