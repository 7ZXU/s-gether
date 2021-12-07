import React, {useState, useEffect} from 'react';
import InputText from './InputText';
import defaultimage from '../assets/upLoadImage.png';
import CustomButton from './CustomButton';
import '../css/ChallengePopup.css';
import axios from 'axios';
import MuiCard from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import studyBackground from '../assets/studyBackground.jpg';
import {getCookie} from '../cookie';


function AddMyChallenge(props)  {
    const {onClose} = props;
    const {cardData} = props;
    const token = getCookie('myToken');

    const AddButtonClick = () => {
 
        axios.post("http://localhost:5000/api/enrollChallenge", {
            token: token,
            data : cardData
        })
        .then((response) => {
            
        })
        .catch((error) => {
          
        });
        onClose(false)
    }

    return(
        <div className="popup">
                <Stack direction="column" spacing={2} alignItems="center">
                    <MuiCard sx={{ maxHeight : "90%", maxWidth: "50%" ,border: 2, borderRadius: 2,}}>
                        <CardMedia
                        component="img"
                        height = "50%"
                        image= {cardData['img']} 
                        alt="Paella dish"
                        />
                        <CardContent align = "center">
                        <Typography variant="h6" component="div" align="center">
                            {cardData['name']}
                        </Typography>
                        <Typography variant="h8" component="div" align="center">
                            Date : {cardData['startDate'].split('T')[0]} ~ {cardData['endDate'].split('T')[0]}
                        </Typography>
                        <Typography variant="h8" component="div" align="center">
                            People : {cardData['current_participants']}/{cardData['max_participants']}
                        </Typography>
                        <Typography variant="h8" component="div" align="center">
                            Point : {cardData['fee']}
                        </Typography>
                        </CardContent>

                    </MuiCard>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Button style={{minWidth: '300px', minHeight: '100px'}} variant="contained" onClick = {AddButtonClick}>
                            <Typography variant="h2" component="div" align="center">
                                Yes
                            </Typography>
                        </Button>
                        <Button style={{minWidth: '300px', minHeight: '100px'}} variant="contained" onClick={() => {onClose(false);}}>
                            <Typography variant="h2" component="div" align="center">
                                No
                            </Typography>
                        </Button>
                    </Stack>
                </Stack>
         
        </div>
    )
}

 
export default AddMyChallenge;
