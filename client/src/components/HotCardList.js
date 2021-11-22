import React from 'react';
import SpecificItem from './specificItem';
import Carousel from 'react-elastic-carousel';
import Typography from '@mui/material/Typography';
import studyBackground from '../assets/studyBackground.jpg';
import '../css/hotCardList.css';

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function HotCardList() {
  return (
    <div className="HotCardList">
      <Carousel breakPoints={breakPoints}>
        <SpecificItem>
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
          <Typography variant="h6" component="div" align="center">
            Date : 2021-09 ~ 2021-12
          </Typography>
          <Typography variant="h6" component="div" align="center">
            People : 0/10
          </Typography>
          <Typography variant="h6" component="div" align="center">
            Point : 10pt
          </Typography>
        </SpecificItem>
        <SpecificItem>
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
          <Typography variant="h6" component="div" align="center">
            Date : 2021-09 ~ 2021-12
          </Typography>
          <Typography variant="h6" component="div" align="center">
            People : 0/10
          </Typography>
          <Typography variant="h6" component="div" align="center">
            Point : 10pt
          </Typography>
        </SpecificItem>
        <SpecificItem>
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
          <Typography variant="h6" component="div" align="center">
            Date : 2021-09 ~ 2021-12
          </Typography>
          <Typography variant="h6" component="div" align="center">
            People : 0/10
          </Typography>
          <Typography variant="h6" component="div" align="center">
            Point : 10pt
          </Typography>
        </SpecificItem>
        <SpecificItem>
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
          <Typography variant="h6" component="div" align="center">
            Date : 2021-09 ~ 2021-12
          </Typography>
          <Typography variant="h6" component="div" align="center">
            People : 0/10
          </Typography>
          <Typography variant="h6" component="div" align="center">
            Point : 10pt
          </Typography>
        </SpecificItem>
        <SpecificItem>
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
          <Typography variant="h6" component="div" align="center">
            Date : 2021-09 ~ 2021-12
          </Typography>
          <Typography variant="h6" component="div" align="center">
            People : 0/10
          </Typography>
          <Typography variant="h6" component="div" align="center">
            Point : 10pt
          </Typography>
        </SpecificItem>
        <SpecificItem>
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
          <Typography variant="h6" component="div" align="center">
            Date : 2021-09 ~ 2021-12
          </Typography>
          <Typography variant="h6" component="div" align="center">
            People : 0/10
          </Typography>
          <Typography variant="h6" component="div" align="center">
            Point : 10pt
          </Typography>
        </SpecificItem>
      </Carousel>
    </div>
  );
}

export default HotCardList;
