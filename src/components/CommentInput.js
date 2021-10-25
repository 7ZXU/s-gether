import { Avatar } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import AvatarHeader from "./Style";
import FlexRow from "./Style";
import Comments from "./Comments"

const TextInput = styled.textarea`
margin-top: 10px;
font-size: 20px;
width: 80%;
height: 100px;
`;

const Submit = styled.input`

`;

function CommentInput({ id, src }) {
const [comment, setComment] = useState("hi");
  return (
    <div>
        <AvatarHeader id={id} src={src}></AvatarHeader>
        <TextInput rows="5"></TextInput>
        <Submit type="submit" value="Submit" 
        onClick={()=>{
            setComment(comment);
            return(
                <Comments id={id} src={src} comment={comment}></Comments>
            );
            }}></Submit>
    </div>
  );
}

export default CommentInput;
