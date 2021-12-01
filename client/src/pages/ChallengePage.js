import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import '../css/ChanllengePage.css';
import MyCard from '../components/MyCard';
import HotCardList from '../components/HotCardList';
import Box from '@mui/material/Box';
import StudyList from '../components/StudyList';
import WorkoutList from '../components/WorkoutList';
import ProjectList from '../components/ProjectList';
import RoutineList from '../components/RoutineList';
import Header from '../components/Header';
import ChallengePopup from '../components/ChallengePopup';
import AddMyChallenge from '../components/AddMyChallenge';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import studyBackground from '../assets/studyBackground.jpg';


function ChanllengePage() {
  const defaultdata = {"name" : "Empty", "startDate" : "00T", "endDate" : "00T", "max_participants" : "00", "fee" : "00"}
  const [selected, setSelected] = useState('Study');
  const [buttonPopup, setButtonPopup] = useState(false);
  const [AddMyChallengePopup, setAddMyChallengePopup] = useState(false);
  const [data, setdata] = useState(defaultdata);
  const onClickStudy = () => setSelected('Study');
  const onClickWorkout = () => setSelected('Workout');
  const onClickRoutine = () => setSelected('Routine');
  const onClickProject = () => setSelected('Project');
  

  const MyCardList = () => {
    return(
      <Box sx={{ border: 2, borderRadius: 1 }}>
        <MyCard></MyCard>
      </Box>
    )
  };

  const theme = createTheme({
    palette: {
      neutral: {
        main: '#64748B',
        contrastText: '#fff',
        max_width: '50px'
      },
    },
  });
  
  const CardList = () =>{
    console.log("카드리스트 챌린지 ")
    return(
      <Box
          sx={{
            border: 2,
            borderRadius: 2,
            width: '90%',
            align: 'center',
            align: 'center',
          }}
        >
          <HotCardList/>
        </Box>
    )
  };

  const ButtonList = () =>{
    return(
      <Box
          sx={{
            border: 2,
            borderRadius: 2,
            height: '90%',
            width: '100%',
            align: 'center',
          }}
        >
        <Stack direction="column" spacing={2}>
          <ThemeProvider theme={theme}>
            <Button variant="contained" color = "neutral" onClick={onClickStudy}>Study</Button>
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Button variant="contained" color = "neutral"  onClick={onClickWorkout}>Workout</Button>
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Button variant="contained" color = "neutral"  onClick={onClickRoutine}>Routine</Button>
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Button variant="contained" color = "neutral"  onClick={onClickProject}>Project</Button>
          </ThemeProvider>
          
        </Stack>
        </Box>
    )
  }
  
  const SpecificCard = () =>{
    return(
      <MuiCard sx={{ maxHeight : "90%", maxWidth: "50%" ,border: 2, borderRadius: 2,}}>
          <CardActionArea onClick = {() => setAddMyChallengePopup(true)} >
            <CardMedia
              component="img"
              height = "50%"
              image= {data['img'] ? data['img'] : studyBackground} 
              alt="Paella dish"
            />
            <CardContent align = "center">
              <Typography variant="h6" component="div" align="center">
                {data['name']}
              </Typography>
              <Typography variant="h8" component="div" align="center">
                Date : {data['startDate'].split('T')[0]} ~ {data['endDate'].split('T')[0]}
              </Typography>
              <Typography variant="h8" component="div" align="center">
                People : {data['current_participants']}/{data['max_participants']}
              </Typography>
              <Typography variant="h8" component="div" align="center">
                Point : {data['fee']}
              </Typography>
            </CardContent>
          </CardActionArea>
        </MuiCard>
    )
  }

  return (
    <div className="chanllengePage">
      <div className="navigator">
        <Header />
      </div>
      <div className="addChanllenge">
        <IconButton onClick={() => setButtonPopup(true)}>
          <AddIcon />
            AddChanllenge
          </IconButton>
      </div>
      {buttonPopup &&<ChallengePopup onClose={setButtonPopup}/>}
      
      <div className="myChanllenge">
        
        <h1>My Chanllenges</h1>
          {!buttonPopup && <MyCardList/>};
        
      </div>
      
      <div className="hotChanllenge">
        <h1>Hot Chanllenges</h1>
      </div>
      <div className="hotCardList">
        {!buttonPopup && <CardList/>}
      </div>
      <div className="chanllenges">
        <h1>Looking for a chanllenge members</h1>
      </div>
      <div className="studyCategory">
      {!buttonPopup && <ButtonList/>}
      </div>
      <div className="specificList">
        <Box
          sx={{
            border: 2,
            borderRadius: 2,
            height: '90%',
            width: '100%',
            align: 'center',
          }}
        >
        
          {(function () {
            switch (selected) {
              case 'Study':
                return <StudyList setCard={setdata}/>;
              case 'Routine':
                return <RoutineList setCard={setdata}/>;
              case 'Project':
                return <ProjectList setCard={setdata}/>;
              case 'Workout':
                return <WorkoutList setCard={setdata}/>;
              default:
                throw new Error('error');
            }
          })()}
        </Box>
      </div>
      <div className="cardinfo">
        {!buttonPopup && <SpecificCard />}
        {AddMyChallengePopup  &&<AddMyChallenge onClose={setAddMyChallengePopup} cardData = {data}/>}
      </div>
    </div>
  );
}

export default ChanllengePage;
