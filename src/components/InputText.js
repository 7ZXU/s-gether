import React from 'react';
import styled from 'styled-components';

// 두개가 함께 있을땐 상단 (그 사이) 에 여백을 준다
const Wrapper = styled.div`
  & + & {
    margin-top: 1.5rem;
  }
`;

const Input = styled.input`
  border: 2px solid #000000;
  outline: none;
  border-radius: 10px;
  line-height: 2.5rem;
  font-size: 1.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

function InputText({ ...rest }) {
  return (
    <Wrapper>
      <Input {...rest} autoComplete="off" />
    </Wrapper>
  );
}

export default InputText;
