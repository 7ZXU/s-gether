import React from 'react';
import styled from 'styled-components';
import test from '../img/example.jpg';

const Container = styled.div`
  border: 5px solid #000000;
  border-radius: 10px;
  width: 400px;
  height: 400px;
`;

const Photo = styled.img`
  border: none;
  border-radius: 100%;
`;

function UserBlock() {
  return (
    <Container>
      <img src={test} alt="사용자 이미지" width="250" height="250" />
    </Container>
  );
}

export default UserBlock;
