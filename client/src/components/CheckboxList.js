import { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox, Button } from "@mui/material";
import axios from "axios";
import styled from "styled-components";
import { getCookie } from "../cookie";

export default function CheckboxList({ list, show, loadList, value }) {
  const [user, setUser] = useState(list.user_id);
  const [checked, setChecked] = useState(list.plan_check);
  const [idx, setIdx] = useState(list.idx);
  const [date, setDate] = useState(list.plan_date);
  const token = getCookie("myToken");
  console.log(show);
  

  console.log("CheckboxList/date", date);

  // useEffect(()=>{
  //   async function saveCheck() {
      
  //     console.log("saved check", checked);

  //     await axios.post("http://localhost:5000/api/check", {
  //       user: user,
  //       checked: checked,
  //       idx: idx,
  //     });
  //   }

  //   saveCheck();
  // })

  const onClick = () => {
    async function DeleteTodo() {
      await axios.post("http://localhost:5000/api/delete", {
        user: user,
        idx: idx,
      }).then(
        loadList(value)
      )
    }

    DeleteTodo();
    // loadlist();



  };

  const handleChange = (e) => {

    async function saveCheck() {
      
      console.log("saved check", checked);
      let isChecked;

      checked? isChecked = 0 : isChecked = 1  ; 

      await axios.post("http://localhost:5000/api/check", {
        user: user,
        checked: isChecked,
        idx: idx,
      });
    }

    saveCheck();

    console.log("before", checked);
    // 누르면 db에 plan_check 값 바꿔야되는 거잖아
    // api 연결해야 할 듯
    
    checked ? setChecked(0) : setChecked(1)  ;

    console.log("after", checked);

    

  };

  return (

    show === "1" ?
    <FormGroup
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
      }}
    >
      {/* <input type="checkbox" checked={checked} onChange={handleChange} />
      <div> {list.plan_todo} </div> */}
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={handleChange} />}
        label={list.plan_todo}
      />
      <Button style={{ border: "none" }} onClick={onClick}>
        🗑
      </Button>
    </FormGroup>
    :
    <FormGroup
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {/* <input type="checkbox" checked={checked} onChange={handleChange} />
      <div> {list.plan_todo} </div> */}
      <FormControlLabel
        control={<Checkbox checked={checked} />}
        label={list.plan_todo}
      />
    </FormGroup>
    
  );
}
