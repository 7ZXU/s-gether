import React from 'react';
import InputText from './InputText';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Button = styled.button`
  cursor: pointer;
  width: 100%;
  border: 2px solid #000000;
  color: #ffffff;
  background: #000000;
  outline: none;
  border-radius: 10px;
  line-height: 2.5rem;
  font-size: 1.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin-top: 1.5rem;

  & > Link {
    color: #ffffff;
  }

  &:hover {
    background-color: #ffffff;
    color: #000000;
  }
`;

const Aligner = styled.div`
  margin-top: 10px;
  text-align: right;
`;

const StyledLink = styled(Link)`
  color: #ffffff;
  cursor: pointer;
`;



    



function LoginForm({ to }) {


  
  const [inputId, setInputId] = useState('')
      const [inputPw, setInputPw] = useState('')
   
      const handleInputId = (e) => {
          setInputId(e.target.value)
      }
   
      const handleInputPw = (e) => {
          setInputPw(e.target.value)
      }
   

      const [valid, setvalid] = useState(false)
      const onInsertToggle = () => {
        setvalid((prev) => !prev);
      };
      

      const [notvalid, setnotvalid] = useState(false)
      const onInsertToggle2 = () => {
        if(notvalid == false){
        setnotvalid((prev) => !prev);}
      };

      const enterId = (e) => {
        const userId = inputId;
        const userPassword = inputPw;
        axios
          .post("http://localhost:5000/api/user2", {
            userId,
            userPassword,
          })
          .then((response) => {
            console.log(response.data);
            if(response.data.result == 'ok'){
              onInsertToggle();
            }
            else{
              onInsertToggle2();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };

  return (
    <>
      <InputText name="email" placeholder="ID..." value={inputId} onChange={handleInputId} />
      <InputText name="password" placeholder="PW..." type="password" value={inputPw} onChange={handleInputPw} />
      <Button id = {inputId} password = {inputPw} onClick={enterId} >로그인</Button>
      {valid && <Redirect to={to}/>}
      {notvalid && <div>id 또는 비밀번호를 확인해 주세요</div>}

      <Aligner>
        {/* <StyledLink to={to}>아이디가 없으신가요?</StyledLink> */}
      </Aligner>
    </>
  );
}

export default LoginForm;

/*{valid && <Redirect to={to}/>}
      {notvalid && <div>id 또는 비밀번호를 확인해 주세요</div>}
      
      const userId = inputId;
        const userPassword = inputPw;*/
