import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ChallengeCard({challenge_name, challenge_image}) {
  return (
    <Card sx={{width: 1, border: "5px solid black", borderRadius:"20px", margin:"5px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="80"
          image={challenge_image}
          alt="challenge1"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" >
            {challenge_name}
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