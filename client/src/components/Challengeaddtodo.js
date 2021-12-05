import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState , useEffect} from 'react';
import axios from 'axios';
import { setCookie, getCookie } from '../cookie';

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        display: "flex",
        flexDirection: "column",
        p: 4,
      };



    export default function Ctodo({open, user, cid, cday,onInsertToggle2}) {

    let time = new Date();
    let year = time.getFullYear;
    let day = time.getDay;
    let month = time.getMonth;

        const [setting, setSetting] = useState(open);
        const handleClose = () => {setSetting(false)};
        const [todo, setTodo] = useState("");
        const token = getCookie('myToken');
    
        const onClick = ()=>{
    
            console.log(token); //challenge_date: year+"-"+month+"-"+day,
      
            async function saveData(){
                await axios
                    .post('http://localhost:5000/api/ctodoupload', {
                        params: {
                            'todo':todo,
                            'challenge_id':cid,
                            'token':token,
                            'challenge_date': cday.substring(0,10)+'T15:00:00.000Z'
                        }
                    })
                    
            }

    
            saveData();

            onInsertToggle2();
    
    
        }
    
    return (
        <div>
          
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open= {open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                  <h1>Todo 추가 </h1>
       
                <input type='text' onBlur={(e)=>{setTodo(e.target.value);}} placeholder="할 일을 입력하세요"/>
    
                  <button onClick={onInsertToggle2}>취소</button>
                  <button onClick={onClick}>완료</button>
    
              </Box>
            </Fade>
          </Modal>
        </div>
      );
    }
