import React from 'react';
import Item from '../components/item';
import Carousel from 'react-elastic-carousel';
import Typography from '@mui/material/Typography';
import studyBackground from '../assets/studyBackground.jpg';
import {setCookie, getCookie} from '../cookie';
import '../css/card.css';

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function card() {
  const token = getCookie('myToken')
  console.log(token);
  return (
    <div className="card">
      <Carousel breakPoints={breakPoints}>
        <Item>
          <img
            className="studyBackground-img"
            src={studyBackground}
            alt="card 사진"
            heigth="200"
            width="200"
            align="center"
          />
          <Typography variant="h5" component="div" align="center">
            Wake-up Early
          </Typography>
        </Item>
        <Item>
          <img
            className="studyBackground-img"
            src={studyBackground}
            alt="card 사진"
            heigth="200"
            width="200"
            align="center"
          />
          <Typography variant="h5" component="div" align="center">
            Wake-up Early
          </Typography>
        </Item>
        <Item>
          <img
            className="studyBackground-img"
            src={studyBackground}
            alt="card 사진"
            heigth="200"
            width="200"
            align="center"
          />
          <Typography variant="h5" component="div" align="center">
            Wake-up Early
          </Typography>
        </Item>
        <Item>
          <img
            className="studyBackground-img"
            src={studyBackground}
            alt="card 사진"
            heigth="200"
            width="200"
            align="center"
          />
          <Typography variant="h5" component="div" align="center">
            Wake-up Early
          </Typography>
        </Item>
      </Carousel>
    </div>
  );
}

export default card;
