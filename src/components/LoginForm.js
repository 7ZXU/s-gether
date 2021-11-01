import React from 'react';
import InputText from './InputText';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  return (
    <>
      <InputText name="email" placeholder="ID..." />
      <InputText name="password" placeholder="PW..." type="password" />
      <Link to={to}>
        <Button>로그인</Button>
      </Link>
      <Aligner>
        {/* <StyledLink to={to}>아이디가 없으신가요?</StyledLink> */}
      </Aligner>
    </>
  );
}

export default LoginForm;
