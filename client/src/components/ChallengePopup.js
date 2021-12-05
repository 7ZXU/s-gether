import React, {useState} from 'react';
import InputText from './InputText';
import defaultimage from '../assets/upLoadImage.png';
import CustomButton from '../components/CustomButton';
import '../css/ChallengePopup.css';
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


function ChallengePopup(props)  {
    const url = "http://localhost:5000";
    const {onClose} = props;
    const [imgSrc, setImgSrc] = useState(defaultimage);
    const [ChallengeName, setChallengeName] = useState("");
    const [ChallengeEndDate, setChallengeDate] = useState("");
    const [ParticipantsNum, setParticipantsNum] = useState("");
    const [EntryFee, setEntryFee] = useState("");
    const [ChallengeStartDate, setChallengeStartDate] = useState("");
    const [categoryStudy, setcategoryStudy] = useState(false);
    const [categoryworkOut, setcategoryworkOut] = useState(false);
    const [categoryRoutine, setcategoryRoutine] = useState(false);
    const [categoryProject, setcategoryProject] = useState(false);
    
    const onChangeHandle = (evt)=>{
        if(evt.target.files.length){
            const imgTarget = (evt.target.files)[0];
            const fileReader = new FileReader();
            fileReader.readAsDataURL(imgTarget);
            fileReader.onload = function(e) {
              setImgSrc(e.target.result);
            }
        }else{
            setImgSrc(defaultimage);
        }
    }
    
    const onHandleUpload = async () => {
        var type = "";
        console.log(categoryProject);
        console.log(categoryworkOut);
        console.log(categoryStudy);
        console.log(categoryRoutine);
        if(categoryProject === false){
            type = "Project";
        }
        else if(categoryworkOut === false){
            type = "Workout";
        }
        else if(categoryStudy === false){
            type = "Study";
        }
        else if(categoryRoutine === false){
            type = "Routine";
        }
        else{
            return;
        }
        try {
            axios.post(`${url}/api/upLoadChallenge`, {
                params: {
                    'img':imgSrc,
                    'StartDate':ChallengeStartDate,
                    'EndDate':ChallengeEndDate,
                    'Name' : ChallengeName,
                    'EntryFee':EntryFee,
                    'PeopleNum':ParticipantsNum,
                    'type' : type,
 
                }
            });
            setChallengeName("");
            setChallengeDate("");
            setParticipantsNum("");
            setEntryFee("");
            setChallengeStartDate("");
        } catch (e) {
            console.error('[FAIL] POST ANSWER', e);
            return e;
        }
    }
    const handleChallengeName = (e) => {
        setChallengeName(e.target.value)
    }
    const handleChallengeDate = (e) =>{
        setChallengeDate(e.target.value)
    }
    const handleParticipantsNum = (e) =>{
        setParticipantsNum(e.target.value)
    }
    const handleEntryFee = (e) =>{
        setEntryFee(e.target.value)
    }
    const handleChallengeStartDate = (e) =>{
        setChallengeStartDate(e.target.value)
    }
    const handlestudyCategoryButton = (e) =>{
        if(categoryStudy === true | categoryworkOut === true){
            setcategoryworkOut(false);
            setcategoryRoutine(false);
            setcategoryProject(false);
        }
        else{
            setcategoryworkOut(true);
            setcategoryRoutine(true);
            setcategoryProject(true);
        }
    }
    const handleWorkoutCategoryButton = (e) =>{
        if(categoryworkOut === true | categoryStudy === true){
            setcategoryStudy(false);
            setcategoryRoutine(false);
            setcategoryProject(false);
        }
        else if(categoryworkOut === true | categoryStudy === false){
            setcategoryStudy(true);
            setcategoryRoutine(true);
            setcategoryProject(true);
        }
  
    }

    const handleRoutineCategoryButton = (e) =>{
        if(categoryRoutine === true | categoryStudy === true){
            setcategoryStudy(false);
            setcategoryworkOut(false);
            setcategoryProject(false);
        }
        else{
            setcategoryStudy(true);
            setcategoryworkOut(true);
            setcategoryProject(true);
        }
            
    }

    const handleProjectCategoryButton = (e) =>{
        if(categoryRoutine === true | categoryStudy === true){
            setcategoryStudy(false);
            setcategoryworkOut(false);
            setcategoryRoutine(false);
        }
        else{
            setcategoryStudy(true);
            setcategoryworkOut(true);
            setcategoryRoutine(true);
        }
            
    }
    return(
        <div className="popup">
            <div className="popup-inner">
                <div className = "ImageUpload">
                    
                    <img height = "200px"
                        src = {imgSrc}>
                    </img>
                    <input type='file' 
                        accept='image/jpg,impge/png,image/jpeg,image/gif' 
                        name='profile_img' 
                        onChange={onChangeHandle}>
                    </input>
                </div>
                <br></br>
                
                <Stack direction="row" spacing={1}>
                    <Button variant="contained"  onClick = {handlestudyCategoryButton} disabled = {categoryStudy}> 
                        Study
                    </Button>
                    <Button variant="contained" onClick = {handleWorkoutCategoryButton} disabled = {categoryworkOut}> 
                        Workout
                    </Button>
                    <Button variant="contained" onClick = {handleRoutineCategoryButton} disabled = {categoryRoutine}> 
                        Routine
                    </Button>
                    <Button variant="contained" onClick = {handleProjectCategoryButton} disabled = {categoryProject}> 
                        Project
                    </Button>
                </Stack>
               
                <br></br>
                <div className = "inputText">
                    <InputText placeholder="Name"  value={ChallengeName} onChange={handleChallengeName } />    
                </div>
                <br></br>
                <div className = "inputText">
                    <InputText placeholder="Start Date (YYYY-MM-DD)"value={ChallengeStartDate} onChange={handleChallengeStartDate} />    
                </div>
                <br></br>
                <div className = "inputText">
                    <InputText  placeholder="End Date (YYYY-MM-DD)" value={ChallengeEndDate} onChange={handleChallengeDate}   />    
                </div>
                <br></br>
                <div className = "inputText">
                    <InputText placeholder="Number of participants " value={ParticipantsNum} onChange={handleParticipantsNum}  />    
                </div>
                <br></br>
                <div className = "inputText">
                    <InputText placeholder= "Entry fee "  value={EntryFee} onChange={handleEntryFee}/>    
                </div>
               
                <div className = 'close-btn'>
                    <CustomButton onClick={onHandleUpload}>Upload</CustomButton>
                </div>
                <div className = 'close-btn'>
                    
                    <CustomButton onClick={() => {onClose(false);}}>Close</CustomButton>
                </div>
        
            </div>
        </div>
    )
}

 
export default ChallengePopup;
