import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import img1 from '../assets/friend1.jpeg';

export default function ChallengeCard() {
  return (
    <Card sx={{width: 1, border: "5px solid black", borderRadius:"20px", margin:"5px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="80"
          image={img1}
          alt="challenge1"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" >
            Challenge1
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}