import React from 'react';
import './LoginForm.css';
import InputText from './InputText';
import styled from 'styled-components';

const Button = styled.button`
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
`;

const Register = styled.input``;

function LoginForm() {
  return (
    <div>
      <InputText name="email" placeholder="ID..." />
      <InputText name="password" placeholder="PW..." type="password" />
      <Button>로그인</Button>
    </div>
  );
}

export default LoginForm;
