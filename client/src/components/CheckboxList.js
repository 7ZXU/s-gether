import {useState} from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Checkbox, Button} from '@mui/material';
import axios from 'axios';
import styled from 'styled-components';


export default function CheckboxList({list, key}) {

  const [user, setUser] = useState(list.user_id)
  const [checked, setChecked] = useState(list.plan_check)
  const [idx, setIdx] = useState(list.idx)

  console.log(key);
  

  const onClick=() => {
    async function DeleteTodo(){
      await axios.post("http://localhost:5000/api/delete", {
        user: user,
        idx: key,
      })
    }

    DeleteTodo();
  }

  const handleChange = (e) =>{
    // 누르면 db에 plan_check 값 바꿔야되는 거잖아
    // api 연결해야 할 듯
    async function saveCheck() {
      
      console.log("before", checked, typeof(checked));
      // console.log("checkboxlist",user, checked, idx);
      if (checked === 0) {
        setChecked(1);
      } else {
        setChecked(0);
      }

      console.log("after", checked);

      await axios.post("http://localhost:5000/api/check", {
          user: user,
          checked: checked,
          idx: idx,

      });
    }

    saveCheck();

  }

  return (
    <FormGroup style={{display:"flex", flexDirection:"row", justifyContent:"space-between" }}>
      <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange}/>} label={list.plan_todo} />
      <Button style={{border:"none"}} onClick={onClick}>🗑</Button>
    </FormGroup>
  );
}