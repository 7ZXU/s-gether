import React from 'react';
import './LoginForm.css';
import InputText from './InputText';
import styled from 'styled-components';

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

  &:hover {
    background-color: #ffffff;
    color: #000000;
  }
`;

const Aligner = styled.div`
  margin-top: 10px;
  text-align: right;
`;

const StyledLink = styled.p`
  color: #888888;
  cursor: pointer;
  &:hover {
    color: #000000;
  }
`;

const Register = styled.input``;

function LoginForm() {
  return (
    <>
      <InputText name="email" placeholder="ID..." />
      <InputText name="password" placeholder="PW..." type="password" />
      <Button>로그인</Button>
      <Aligner>
        <StyledLink>아이디가 없으신가요?</StyledLink>
      </Aligner>
    </>
  );
}

export default LoginForm;
