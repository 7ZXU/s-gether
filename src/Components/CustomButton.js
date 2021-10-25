import React from 'react';
import styled from 'styled-components';

// 두개가 함께 있을땐 상단 (그 사이) 에 여백을 준다
const Wrapper = styled.div`
  & + & {
    margin-top: 40px;
  }
`;

const Button = styled.div`
  border: 3px solid #000000;
  border-radius: 10px;

  margin-top: 1rem;
  padding-top: 0.6rem;
  padding-bottom: 0.5rem;
  margin-left: 10px;
  margin-right: 10px;

  background: #ffffff;
  color: #000000;

  text-align: center;
  font-size: 1.25rem;
  font-weight: 500;

  cursor: pointer;
  user-select: none;
  transition: 0.2s all;

  &:hover {
    background-color: #000000;
    color: #ffffff;
  }

  &:active {
    background-color: #000000;
    color: #ffffff;
  }
`;

function CustomButton({ children }) {
  return (
    <Wrapper>
      <Button>{children}</Button>
    </Wrapper>
  );
}

export default CustomButton;
