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

  const [user, setuser] = useState([
    
  ]);
  
  
   useEffect (async() => {
    try{
      const res = await axios.get('http://localhost:5000/api/user')
      const _inputData = await res.data.map((rowData) => ({
              id: rowData.id,
              password: rowData.password,
              name: rowData.name,
              nickname: rowData.nickname,
              email: rowData.email
            })
      )
      setuser(user.concat(_inputData))
    } catch(e){
      console.error(e.message)
    }
  }, []);
  
  const [inputId, setInputId] = useState('')
      const [inputPw, setInputPw] = useState('')
   
      const handleInputId = (e) => {
          setInputId(e.target.value)
      }
   
      const handleInputPw = (e) => {
          setInputPw(e.target.value)
      }
   

      const onClickLogin = () => {
        const userss = user.find((user) => user.id === inputId);
        if (!userss || userss.password !== inputPw) {
          onInsertToggle2();
        }
        else {onInsertToggle(); return userss}
      }

      const [valid, setvalid] = useState(false)
      const onInsertToggle = () => {
        setvalid((prev) => !prev);
      };
      

      const [notvalid, setnotvalid] = useState(false)
      const onInsertToggle2 = () => {
        setnotvalid((prev) => !prev);
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
