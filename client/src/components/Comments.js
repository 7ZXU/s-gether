import { childElements } from "dom-helpers";
import React, { useState } from "react";
import styled from "styled-components";
// import { Container, Grid } from '@material-ui/core';
import Avatar from "@mui/material/Avatar";
import AvatarHeader from "./Style";

const Container = styled.div`
  display: flex;
  height: 80%;
`;


const Comment = styled.text`
    padding-top: 10px;
  padding-left: 50px;
  padding-bottom: 20px;
`;

function Comments({id, comment}) {


  return (

    <div>
    <AvatarHeader id={id}></AvatarHeader>
      <Container>
        <Comment>{comment}</Comment>
      </Container>
    </div>
  );
}

export default Comments;
