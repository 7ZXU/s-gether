import React, { useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import './ChanllengePage.css';
import Card from '../components/card';
import HotCardList from '../components/HotCardList';
import CustomButton from '../components/CustomButton';
import SpecificCard from '../components/SpecificCard';
import Box from '@mui/material/Box';
import AddChanllengePopup from '../components/AddChanllengePopup';
import StudyList from '../components/StudyList';
import WorkoutList from '../components/WorkoutList';
import ProjectList from '../components/ProjectList';
import RoutineList from '../components/RoutineList';

function ChanllengePage() {
    const [selected, setSelected] = useState('Study');
    const [buttonPopup, setButtonPopup] = useState(false);
    
    const onClickStudy = () => setSelected('Study');
    const onClickWorkout = () => setSelected('Workout');
    const onClickRoutine = () => setSelected('Routine');
    const onClickProject = () => setSelected('Project');

    return (
        <div className = "chanllengePage">
            <div className = "navigator">
                <IconButton>
                    <ArrowBackIosNewIcon />
                        My Feed
                </IconButton>
            </div>
            <div className = "addChanllenge">
                <IconButton onClick ={() => setButtonPopup(true)}>
                    <AddIcon  />
                        AddChanllenge
                </IconButton>
            </div>
            <div className = "myChanllenge">
                <h1>
                    My Chanllenges
                </h1>
                <br></br>
                <br></br>
       
                <Box sx = {{border : 2 , borderRadius : 1 }}>
                    <Card></Card>
                </Box>
            </div>
            <div className = "hotChanllenge">
                <h1>
                    Hot Chanllenges
                </h1>
            </div>
            <div className = "hotCardList">
                <Box sx = {{border : 2 , borderRadius : 2,width : "90%", align : 'center', align : "center"}}>
                    <HotCardList></HotCardList>
                </Box>
            </div>
            <div className = "chanllenges">
                <h1>
                    Looking for a chanllenge members
                </h1>
            </div>
            <div className = "studyCategory">
                <Box sx = {{border : 2 , borderRadius : 2,  height : "90%", width : "60%",align : 'center', align : "center"}}>
                    <CustomButton onClick={onClickStudy}>Study</CustomButton>
                    <CustomButton onClick={onClickWorkout}>Workout</CustomButton>
                    <CustomButton onClick={onClickRoutine}>Routine</CustomButton>
                    <CustomButton onClick={onClickProject}>Project</CustomButton>
                </Box>
            </div>
            <div className = "specificList">
                <Box sx = {{border : 2 , borderRadius : 2, height : "90%", width : "100%",align : 'center'}}>
                    {selected}
                    {buttonPopup.toString()}
                    {(function () {
                        switch (selected) {
                            case 'Study':
                                return <StudyList />;
                            case 'Routine':
                                return <RoutineList />;
                            case 'Project':
                                return <ProjectList />;
                            case 'Workout':
                                return <WorkoutList/>;
                        
                    }})}
                </Box>
            </div>
            <div className = "cardinfo">
                
                <SpecificCard></SpecificCard>

            </div>
            
        </div>
    )
}

export default ChanllengePage
