import React from 'react';
import styled from 'styled-components';

// 두개가 함께 있을땐 상단 (그 사이) 에 여백을 준다


const Input = styled.input`
  border: 3px solid #000000;
  outline: none;
  border-radius: 0px;
  line-height: 2.5rem;
  font-size: 1.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  width: 500px;
  margin: 10px;
 
`;

function InputText({ ...rest }) {
  
  return (

      <Input {...rest} autoComplete="off" />

  );
}

export default InputText;
