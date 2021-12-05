import React, {useEffect, useState} from 'react';
import SpecificItem from './specificItem';
import Carousel from 'react-elastic-carousel';
import Typography from '@mui/material/Typography';
import studyBackground from '../assets/studyBackground.jpg';
import '../css/hotCardList.css';
import axios from 'axios';

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function HotCardList() {
  const [dataList, setdata] = useState([]);
  

  async function data() {
    console.log("카드리스트 호출");
    await axios.get('http://localhost:5000/api/HotgetChallengeList', {

    }).then((res) => {
      setdata(res.data.data)
    }).catch((err) => {
      console.log(err);
    });
  };

  useEffect(()=>{
    data();
  },[]);

  console.log(dataList);
  let card = dataList.map((data, key) => 
  <SpecificItem key = {key}>
    
    <img
      className="studyBackground-img"
      src={data['img'] ? data['img'] : studyBackground }
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
      People : {data['current_participants']}/{data['max_participants']}
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
        {dataList ? dataList.map((data, key) => {return (<SpecificItem key = {key}>
    <img
      className="studyBackground-img"
      src={data['img'] ? data['img'] : studyBackground }
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
      People : {data['current_participants']}/{data['max_participants']}
    </Typography>
    <Typography variant="h6" component="div" align="center">
      Point : {data['fee']}
    </Typography>
  </SpecificItem>

        );}
      ): '불러오는중'}
      </Carousel>
    </div>
  );
  
}

export default HotCardList;
