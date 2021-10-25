import React from 'react';
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

function RegisterForm() {
  return (
    <>
      <InputText name="email" placeholder="ID" />
      <InputText name="password" placeholder="PW" type="password" />
      <InputText name="password" placeholder="Check PW" type="password" />
      <Button>회원가입</Button>
      <Aligner>
        <StyledLink>로그인 하기</StyledLink>
      </Aligner>
    </>
  );
}

export default RegisterForm;
